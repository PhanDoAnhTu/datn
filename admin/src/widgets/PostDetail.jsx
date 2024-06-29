// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { Controller, useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import topics_management from "@db/topics_management";
import Select from "@ui/Select";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import DropFiles from "@components/DropFiles";
import { Divider } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const PostDetail = ({ item }) => {
  return (
    <Spring className="card flex-1 xl:py-10">
      <div dangerouslySetInnerHTML={{ __html: `${item.post_content}` }} />
    </Spring>
  );
};

export default PostDetail;
