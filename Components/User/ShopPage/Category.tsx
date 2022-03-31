import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { ClientCategoryItem, ICategory } from "../../../Interfaces/typings";

const Category = ({ categories }: ICategory) => {
  const router = useRouter();
  const Id = router.query?.category;

  return (
    <div className="w-80 flex xl:flex-col gap-x-3 flex-row items-start pb-8 xl:pb-0">
      <CategoryItem href="/shop" name="All" isActive={Id === undefined} />
      {categories?.map(({ _id, name }) => (
        <CategoryItem
          key={_id}
          href={`/shop?category=${name.toLowerCase()}&categoryId=${_id}`}
          name={name}
          isActive={name.toLowerCase() == Id}
        />
      ))}
    </div>
  );
};

export default Category;

const CategoryItem = ({ href, name, isActive }: ClientCategoryItem) => (
  <Link href={href}>
    <a
      className={classNames(
        isActive ? "font-bold py-1.5" : "font-normal py-[5px] ",
        "  xl:text-xl text-base"
      )}
    >
      {name}
    </a>
  </Link>
);
