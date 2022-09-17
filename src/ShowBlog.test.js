import ShowBlog from "./ShowBlog";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

const blog = {
  title: "Book Review: The other black girl",
  author: "Adeola",
  url: "random.com/other-black-girl",
  likes: 0,
  owner: {
    username: "aderemi",
    name: "aderemi",
    id: "61a0c615536522448c572855",
  },
  id: "61ae3713221a2a55966757cb",
};

test("tests the show blog component", () => {
  const component = render(
    <ShowBlog
      blog={blog}
      key={blog.id}
      user={null}
      blogs={[]}
      setBlogs={null}
    />
  );
  const el = component.getByText(blog.title);
  expect(el).toBeDefined();
});

test("tests that likes is not initially shown", () => {
  const component = render(<ShowBlog blog={blog} />);
  const el = component.container.querySelector(".togglable");

  expect(el).toHaveStyle("display:none");
});
