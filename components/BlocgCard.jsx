import React from "react";
import Link from "next/link";
const BlocgCard = ({ title, author, coverPhoto, date_published, slug }) => {
  return (
    <div >
      <Link href={`/posts/${slug}`}>
        <div >
          <img src={coverPhoto.url} alt="" />
        </div>
      </Link>
      <div >
        <h2>{title}</h2>
        <div>
          <div>
            <img src={author.avatar.url} alt="" />
            <h3>{author.name}</h3>
          </div>
          <div >
            <h3>{date_published}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlocgCard;
