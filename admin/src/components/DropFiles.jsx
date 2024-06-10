// components
import { toast } from "react-toastify";

// hooks
import { useDropzone } from "react-dropzone";

// utils
import PropTypes from "prop-types";
import classNames from "classnames";
import { useEffect, useState } from "react";

const imgTypes = {
  "image/jpeg": [],
  "image/png": [],
  "image/gif": [],
  "image/bmp": [],
  "image/webp": [],
  "image/svg+xml": [],
};

const docTypes = {
  "application/pdf": [],
  "application/msword": [],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
  "application/vnd.ms-excel": [],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
};

const DropFiles = ({
  wrapperClass,
  type = "image",
  multiple = false,
  children,
  onChange,
  defaultValue,
}) => {
  const [path, setPath] = useState();
  useEffect(() => {
    setPath(defaultValue);
  }, [defaultValue]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: type === "image" ? { ...imgTypes } : { ...docTypes },
    multiple: multiple,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setPath(URL.createObjectURL(acceptedFiles[0]));
        onChange(acceptedFiles);
      } else {
        toast.error("File type not supported");
      }
    },
  });
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(path);
  }, [path]);

  return (
    <div
      {...getRootProps()}
      className={classNames(
        `${wrapperClass} cursor-pointer overflow-hidden relative`,
        {
          activeClass: isDragActive,
        }
      )}
    >
      <input {...getInputProps()} />
      {children}
      {path ? (
        <img
          src={path}
          className="w-full object-center h-full absolute"
          alt=""
          onLoad={() => {
            URL.revokeObjectURL(path);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

DropFiles.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(["image", "doc"]),
  multiple: PropTypes.bool,
  children: PropTypes.node,
};

export default DropFiles;
