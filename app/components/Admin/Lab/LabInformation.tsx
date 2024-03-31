import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  labInfo: any;
  setLabInfo: (courseInfo: any) => void;
  active: number;
  handleSubmit: any;
  setActive: (active: number) => void;
};

const LabInformation: FC<Props> = ({
  labInfo,
  setLabInfo,
  active,
  handleSubmit: handleLabSubmit,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  
 
  const handleOptions = () => {
    if (
     labInfo.name===""||
     labInfo.address===""||
     labInfo.link===""
    ) {
      toast.error("field can't be empty!");
    } else {
      setActive(active + 1);
      handleLabSubmit();
    }
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setLabInfo({ ...labInfo, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setLabInfo({ ...labInfo, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Lab Name</label>
          <input
            type="name"
            name=""
            required
            value={labInfo.name}
            onChange={(e: any) =>
              setLabInfo({ ...labInfo, name: e.target.value })
            }
            id="name"
            placeholder="Aditya Tyagi"
            className={`
            ${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Write Lab</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Write something amazing..."
            className={`${styles.input} !h-min !py-2`}
            value={labInfo.address}
            onChange={(e: any) =>
              setLabInfo({ ...labInfo, address: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="email">
              Lab link
            </label>
            <input
              type="text"
              required
              name=""
              value={labInfo.link}
              onChange={(e: any) =>
                setLabInfo({ ...labInfo, link: e.target.value })
              }
              id="tags"
              placeholder="Senior Advocate"
              className={`
            ${styles.input}`}
            />
          </div>
          
        </div>
        <br />
        
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {labInfo.image ? (
              <img
                src={labInfo.image}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop person{`'`}s Image here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default LabInformation;
