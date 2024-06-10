// components
import posts_managements from "@db/posts_manangement";
import PageHeader from "@layout/PageHeader";
import PostDetail from "@widgets/PostDetail";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const params = useParams();
  const [record, setRecord] = useState([]);
  useEffect(() => {
    const fetchRecord = async () => {
      const fetchedRecord = await posts_managements.find(
        (item) => item.id === params.id
      );
      setRecord(fetchedRecord);
    };
    fetchRecord();
  }, [params]);
  console.log(record);
  return (
    <>
      <PageHeader title="Chi tiết bài viết" />
      <PostDetail item={record ? record : ""} />
    </>
  );
};

export default EditPost;
