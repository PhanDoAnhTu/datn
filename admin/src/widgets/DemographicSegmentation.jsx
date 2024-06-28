// components
import Spring from "@components/Spring";
import LabeledProgressBar from "@components/LabeledProgressBar";

// utils
import { commaFormatter, getPercentage } from "@utils/helpers";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCustomers } from "../store/actions/user-actions";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

const DemographicSegmentation = ({ customers }) => {
  dayjs.extend(isBetween);
  const [caculatedAge, setCaculatedAge] = useState([]);
  const [caculatedGender, setCaculatedGender] = useState({});

  useEffect(() => {
    setCaculatedAge([
      {
        label: "18-25 tuổi",
        value: customers?.filter((item) =>
          dayjs(item.customer_date_of_birth).isBetween(
            dayjs().subtract(18, "year"),
            dayjs().subtract(25, "year"),
            "year"
          )
        ).length,
      },
      {
        label: "25-45 tuổi",
        value: customers?.filter((item) =>
          dayjs(item.customer_date_of_birth).isBetween(
            dayjs().subtract(25, "year"),
            dayjs().subtract(45, "year"),
            "year"
          )
        ).length,
      },
      {
        label: "45-65 tuổi",
        value: customers?.filter((item) =>
          dayjs(item.customer_date_of_birth).isBetween(
            dayjs().subtract(45, "year"),
            dayjs().subtract(65, "year"),
            "year"
          )
        ).length,
      },
      {
        label: "Trên 65 tuổi",
        value: customers?.filter((item) =>
          dayjs(item.customer_date_of_birth).isBefore(
            dayjs().subtract(65, "year"),
            "year"
          )
        ).length,
      },
    ]);
    setCaculatedGender({
      all: customers?.length,
      male: customers?.filter((item) => item.customer_sex === "Nam").length,
      female: customers?.filter((item) => item.customer_sex === "Nữ").length,
      unknown: customers?.filter((item) => item.customer_sex === "").length,
    });
  }, [customers]);

  return (
    <Spring className="card flex flex-col gap-10 xl:col-span-2">
      <div className="flex flex-col gap-6">
        <h5 className="max-w-[250px] xs:max-w-[unset]">Thống kê độ tuổi</h5>
        <div className="flex flex-col gap-5">
          {caculatedAge.map((item, index) => (
            <LabeledProgressBar
              key={index}
              label={item.label}
              value={getPercentage(caculatedAge, item.value)}
              displayValue={commaFormatter(item.value)}
              color="header"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h5 className="max-w-[250px] xs:max-w-[unset]">Thống kê giới tính</h5>
        <div>
          <div className="flex gap-7 mb-2.5 md:gap-14">
            <div className="flex flex-col gap-3">
              <div className="badge-icon badge-icon--sm bg-accent">
                <i className="icon-venus-regular text-lg" />
              </div>
              <span className="h5">
                {(
                  (caculatedGender?.female / caculatedGender?.all) *
                  100
                ).toFixed(0)}
                %
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="badge-icon badge-icon--sm bg-accent">
                <i className="icon-mars-regular text-lg" />
              </div>
              <span className="h5">
                {((caculatedGender?.male / caculatedGender?.all) * 100).toFixed(
                  0
                )}
                %
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="badge-icon badge-icon--sm bg-accent">
                <i className="icon-genderless-regular text-lg" />
              </div>
              <span className="h5">
                {(
                  (caculatedGender?.unknown / caculatedGender?.all) *
                  100
                ).toFixed(0)}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </Spring>
  );
};

export default DemographicSegmentation;
