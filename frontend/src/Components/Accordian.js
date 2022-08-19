import React, { useState } from "react";
import "./Accordian.css";

function Accordian() {
  const [show, handleShow] = useState(null);
  const toggle = (i) => {
    if (i === show) return handleShow(null);
    handleShow(i);
  };
  return (
    <div className="acord-container">
      <h2 style={{ color: "gray" }} className="acord-header">
        Frequently Asked Questions
      </h2>
      <div className="accordian">
        {data.map((item, i) => (
          <div className="item" key={i}>
            <div className="title" onClick={() => toggle(i)}>
              <h3>{item.question}</h3>
              <span>{show === i ? "-" : "+"}</span>
            </div>
            <div className={show === i ? "content show" : "content"}>
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const data = [
  {
    question: "What is Blogging?",
    answer:
      "Blogging refers to writing, photography, and other media that's self-published online. Blogging started as an opportunity for individuals to write diary-style entries, but it has since been incorporated into websites for many businesses.",
  },
  {
    question: "How much does Blogs cost?",
    answer:
      "If you're using a website builder, it's possible to build a blog for free if you choose a free plan. We don't recommend this, however, because you won't be able to use your own personal domain name, you'll only be able to access limited features, and your blog will be littered with unwanted ads.",
  },
  {
    question: "Where can I watch Blogs?",
    answer:
      "you can find the blog with a search engine; just enter the title or blogs's name after doing successfull login.",
  },
  {
    question: "Where do I  edit or delete blogs?",
    answer:
      "This Application is flexible u can add, edit and delete your blogs as per your need without and restrictions.",
  },
  {
    question: "What can i add in Blogs?",
    answer:
      "You can Add anything related to your life stylem, trends, food, travel, photography :).",
  },
  {
    question: "Do i have to pay for using this Blog App?",
    answer:
      "No, you don't have to pay anything u can use this app for free if you want to support us you can contribute to us. Thank you❤️",
  },
];
export default Accordian;
