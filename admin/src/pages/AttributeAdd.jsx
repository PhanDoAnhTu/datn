// components
import Spring from "@components/Spring";
//import Select from "@ui/Select";
import { toast } from "react-toastify";
// hooks
import { useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import { useState } from "react";
import { Empty } from "antd";
import { useDispatch } from "react-redux";
import attributes_managements from "@db/attributes_managements";
import StyledTable from "@widgets/CategoriesManagementTable/styles";

const AttributeAdd = () => {
  const dispact = useDispatch();
  //-----DECLARE DEFAULT VALUES
  const defaultValues = {
    attribute_name: "",
    attribute_value_list: [{ attribute_value: "" }],
  };
  const [updateSignal, setUpdateSignal] = useState({
    isUpdate: false,
    id: null,
  });

  const ATTRIBUTE_COLUMN_DEFS = [
    {
      title: "Tên nhóm",
      dataIndex: "attribute_name",
      render: (attribute_name) => {
        return (
          <div className="flex flex-col">
            <span className="inline-block h6 !text-sm max-w-[155px]">
              {attribute_name}
            </span>
          </div>
        );
      },
    },
    {
      title: "Đặc tính",
      dataIndex: "attribute_list_value",
      render: (attribute_list_value) => (
        <div className="flex flex-wrap gap-x-0.5">
          {attribute_list_value && attribute_list_value.length
            ? attribute_list_value.map((attribute, index) => {
                return (
                  <span className="tag text-accent capitalize" key={index}>
                    {attribute.attribute_value}
                    {index !== attribute_list_value.length - 1 && ","}
                  </span>
                );
              })
            : "-"}
        </div>
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "category",
      width: 150,
      render: (text, record) => (
        <div className="flex items-center justify-end">
          <button
            className="info-btn px-4"
            onClick={() => {
              handleUpdateBtn(record);
              setUpdateSignal({
                isUpdate: true,
                id: record._id,
              });
            }}
          >
            <i className="icon icon-pen-solid text-lg" />
          </button>
          <button className="group info-btn px-4" to={"/test"}>
            <i className="icon icon-trash-regular text-lg group-hover:text-red" />
          </button>
        </div>
      ),
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const handleUpdateBtn = (value) => {
    setValue("attribute_name", value.attribute_name);
    setValue("attribute_value_list", value.attribute_list_value);
  };

  const attributeList = watch("attribute_value_list");
  const attributeName = watch("attribute_name");

  //---------------------------ATTRIBUTES----------------------------//

  const addAttributeValue = () => {
    const slicedArray = attributeList.slice();
    slicedArray.push({
      attribute_value: "",
    });
    setValue("attribute_value_list", slicedArray);
  };

  const removeAttributeValue = (index) => {
    const slicedArray = attributeList.slice();
    slicedArray.splice(index, 1);
    setValue("attribute_value_list", slicedArray);
  };

  const handleAttributeValueChange = (e, index) => {
    e.preventDefault();
    const slicedArray = attributeList.slice();
    slicedArray[index].attribute_value = e.target.value;
    setValue("attribute_value_list", slicedArray);
  };

  //---------------------------/ATTRIBUTES----------------------------//

  // do something with the data
  const handlePublish = (data) => {
    console.log(data);
    reset();
    setUpdateSignal({ isUpdate: false, id: null });
    toast.success("Product published successfully");
  };
  const handleUpdate = (data) => {
    console.log(data);
    reset();
    setUpdateSignal({ isUpdate: false, id: null });
    toast.success("Product updated successfully");
  };

  // do something with the data

  return (
    <div className="grid grid-cols-1 items-start gap-5 xl:gap-10">
      <Spring className="card flex-1 xl:py-10">
        <div className="grid grid-cols-1 items-start gap-5 xl:gap-10">
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <div className="grid grid-cols-1 gap-y-4 gap-x-2">
              <div className="grid grid-cols-1 gap-y-4 gap-x-2">
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="attribute_name">
                    Tên nhóm đặc tính
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.attribute_name,
                    })}
                    id="attribute_name"
                    value={attributeName}
                    defaultValue={defaultValues.attribute_name}
                    placeholder="VD: Chất liệu, độ bền,..."
                    {...register("attribute_name", { required: true })}
                  />
                </div>
                <div className={`relative flex-1`}>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-2">
                    <div className="grid grid-cols-1 gap-y-4 gap-x-2">
                      <div className="field-wrapper">
                        <span className="field-label">Đặc tính</span>
                        {attributeList.map((item, index) => {
                          return (
                            <div
                              className="flex space-x-3 items-center"
                              key={index}
                            >
                              <input
                                className={"field-input"}
                                key={index}
                                value={item.attribute_value}
                                onChange={(e) =>
                                  handleAttributeValueChange(e, index)
                                }
                                placeholder="VD: chất liệu vải mát mẻ, mùi hương dễ chịu,..."
                              />
                              {index !== 0 ? (
                                <button
                                  onClick={() => removeAttributeValue(index)}
                                  className="btn btn--outline red"
                                >
                                  X
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <button
                      onClick={() => addAttributeValue()}
                      className={`btn--social btn`}
                    >
                      <i className={`icon icon-circle-plus-regular`} />
                      <span>Thêm đặc tính</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`grid gap-2 mt-5 ${
                updateSignal.isUpdate ? "sm:grid-cols-2" : ""
              } sm:mt-10 md:mt-11`}
            >
              {updateSignal.isUpdate ? (
                <>
                  <button
                    className="btn btn--primary"
                    onClick={() => {
                      reset();
                      setUpdateSignal({
                        isUpdate: false,
                        id: null,
                      });
                    }}
                  >
                    Hủy bỏ
                  </button>
                  <button
                    className="btn btn--secondary"
                    onClick={handleSubmit(handleUpdate)}
                  >
                    Lưu
                  </button>
                </>
              ) : (
                <button
                  className="btn btn--primary"
                  onClick={handleSubmit(handlePublish)}
                >
                  Xuất bản
                </button>
              )}
            </div>
          </div>
        </div>
      </Spring>
      <div className="grid grid-cols-1 gap-y-4 gap-x-2">
        <StyledTable
          columns={ATTRIBUTE_COLUMN_DEFS}
          dataSource={attributes_managements}
          rowKey={(record) => record._id}
          locale={{
            emptyText: <Empty text="No variations found" />,
          }}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default AttributeAdd;
