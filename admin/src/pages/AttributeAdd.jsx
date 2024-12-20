// components
import Spring from "@components/Spring";
//import Select from "@ui/Select";
import { toast } from "react-toastify";
// hooks
import { useForm } from "react-hook-form";
import { createAttribute, findAllAttribute, updateAttributeById, removeAttributeById } from "../store/actions";
// utils
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Empty } from "antd";
import { useDispatch } from "react-redux";
// import attributes_managements from "@db/attributes_managements";
import StyledTable from "@widgets/CategoriesManagementTable/styles";


const AttributeAdd = () => {
  const dispact = useDispatch();
  const [attributes_managements, setAttributes_managements] = useState([])


  const fetchAttributes_managements = async () => {
    const respo = await dispact(findAllAttribute())
    if (respo) {
      setAttributes_managements(respo?.payload.metaData)
    }
  }


  //-----DECLARE DEFAULT VALUES
  const defaultValues = {
    attribute_name: "",
    attribute_description: "",
    attribute_value_list: [{ attribute_value: "" }],
  };
  const [updateSignal, setUpdateSignal] = useState({
    isUpdate: false,
    id: null,
  });
  useEffect(() => {
    fetchAttributes_managements()
  }, [updateSignal])
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
      dataIndex: "attribute_value_list",
      render: (attribute_value_list) => (
        <div className="flex flex-wrap gap-x-0.5">
          {attribute_value_list && attribute_value_list.length
            ? attribute_value_list.map((attribute, index) => {
              return (
                <span className="tag text-accent capitalize" key={index}>
                  {attribute.attribute_value}
                  {index !== attribute_value_list.length - 1 && ","}
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
            }}
          >
            <i className="icon icon-pen-solid text-lg" />
          </button>
          <button onClick={() => {
            handleRemoveAttribute(record)
          }} className="group info-btn px-4" to={"/test"}>
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
    console.log(value)
    setValue("attribute_value_list", value.attribute_value_list);
    setValue("attribute_name", value.attribute_name);
    setValue("attribute_description", value.attribute_description);
    setUpdateSignal({ isUpdate: true, id: value._id });
  };
  const handleRemoveAttribute = (value) => {
    console.log(value)
    dispact(removeAttributeById({ _id: value._id }))
    setUpdateSignal({
      isUpdate: false,
      id: null,
    });
  }

  const attributeList = watch("attribute_value_list");
  const attributeName = watch("attribute_name");
  const attribute_description = watch("attribute_description");


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
    dispact(createAttribute(data))
    reset();
    setUpdateSignal({ isUpdate: false, id: null });
    toast.success("Product published successfully");
  };
  const handleUpdate = (data) => {
    console.log(data);
    dispact(updateAttributeById({ _id: updateSignal.id, attribute_name: data.attribute_name, attribute_description: data.attribute_description, attribute_value_list: data.attribute_value_list }))
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
                    placeholder="VD: Phong cách, chất liệu,..."
                    {...register("attribute_name", { required: true })}
                  />
                  <label className="field-label" htmlFor="attribute_description">
                    Mô tả
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.attribute_description,
                    })}
                    id="attribute_description"
                    value={attribute_description}
                    defaultValue={defaultValues.attribute_description}
                    placeholder="VD: Phong cách trang phục,..."
                    {...register("attribute_description", { required: true })}
                  />
                </div>
                <div className={`relative flex-1`}>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-2">
                    <div className="grid grid-cols-1 gap-y-4 gap-x-2">
                      <div className="field-wrapper">
                        <span className="field-label">Đặc tính</span>
                        {attributeList.length > 0 && attributeList.map((item, index) => {
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
              className={`grid gap-2 mt-5 ${updateSignal.isUpdate ? "sm:grid-cols-2" : ""
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
