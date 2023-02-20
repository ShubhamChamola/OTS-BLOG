// React Modules
import { useState, useRef, useEffect } from "react";

// Component Module
import Button from "../../components/ui/Button";

// Utility Modules
import {
  textValidator,
  numberValidator,
  categoryValidator,
} from "../../utils/validators";

// Service Module
import addBlogToDB from "../../services/blog/addBlogToDB";

interface BlogData {
  blogTitle: string | null;
  blogIntro: string | null;
  blogCategory: string | null;
  blogImage: File | null;
  blogReadTime: number | null;
  blogBody: string | null;
}

const dummyBlogImg =
  require("../../assets/images/default_blog_image.jpg") as string;

const BlogCreator: React.FC = () => {
  const [formValues, setFormValues] = useState<BlogData>({
    blogTitle: null,
    blogIntro: null,
    blogCategory: null,
    blogImage: null,
    blogReadTime: null,
    blogBody: null,
  });

  const [formValidation, setFormValidation] = useState({
    isBlogTitleValid: false,
    isBlogIntroValid: false,
    isBlogCategoryValid: false,
    isBlogReadTimeValid: false,
    isBlogBodyValid: false,
  });

  const [bubbleTimer, setBubbleTimer] = useState<null | NodeJS.Timeout>(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const blogTitleRef = useRef<HTMLInputElement | null>(null);
  const blogIntroRef = useRef<HTMLTextAreaElement | null>(null);
  const blogCategoryRef = useRef<HTMLInputElement | null>(null);
  const blogReadTimeRef = useRef<HTMLInputElement | null>(null);
  const blogBodyRef = useRef<HTMLTextAreaElement | null>(null);

  // for Blog Title
  useEffect(() => {
    if (formValues.blogTitle != null)
      setBubbleTimer(
        setTimeout(() => {
          setFormValidation((prev) => {
            return {
              ...prev,
              isBlogTitleValid: textValidator(
                blogTitleRef,
                formValues.blogTitle,
                false
              ),
            };
          });
        }, 400)
      );

    return () => {
      bubbleTimer && clearTimeout(bubbleTimer);
    };
  }, [formValues.blogTitle]);

  // for Blog Intro
  useEffect(() => {
    if (formValues.blogIntro != null)
      setBubbleTimer(
        setTimeout(() => {
          setFormValidation((prev) => {
            return {
              ...prev,
              isBlogIntroValid: textValidator(
                blogIntroRef,
                formValues.blogIntro,
                false
              ),
            };
          });
        }, 400)
      );

    return () => {
      bubbleTimer && clearTimeout(bubbleTimer);
    };
  }, [formValues.blogIntro]);

  // for Blog Category
  useEffect(() => {
    if (formValues.blogCategory != null)
      setBubbleTimer(
        setTimeout(() => {
          setFormValidation((prev) => {
            return {
              ...prev,
              isBlogCategoryValid: categoryValidator(
                blogCategoryRef,
                formValues.blogCategory,
                false
              ),
            };
          });
        }, 400)
      );

    return () => {
      bubbleTimer && clearTimeout(bubbleTimer);
    };
  }, [formValues.blogCategory]);

  // for Read Time
  useEffect(() => {
    if (formValues.blogReadTime != null)
      setBubbleTimer(
        setTimeout(() => {
          setFormValidation((prev) => {
            return {
              ...prev,
              isBlogReadTimeValid: numberValidator(
                blogReadTimeRef,
                formValues.blogReadTime,
                false
              ),
            };
          });
        }, 400)
      );

    return () => {
      bubbleTimer && clearTimeout(bubbleTimer);
    };
  }, [formValues.blogReadTime]);

  // for Blog Body
  useEffect(() => {
    if (formValues.blogBody != null)
      setBubbleTimer(
        setTimeout(() => {
          setFormValidation((prev) => {
            return {
              ...prev,
              isBlogBodyValid: textValidator(
                blogBodyRef,
                formValues.blogBody,
                false
              ),
            };
          });
        }, 400)
      );

    return () => {
      bubbleTimer && clearTimeout(bubbleTimer);
    };
  }, [formValues.blogBody]);

  // for Btn
  useEffect(() => {
    if (
      formValidation.isBlogTitleValid &&
      formValidation.isBlogIntroValid &&
      formValidation.isBlogCategoryValid &&
      formValidation.isBlogReadTimeValid &&
      formValidation.isBlogBodyValid
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [
    formValidation.isBlogTitleValid,
    formValidation.isBlogIntroValid,
    formValidation.isBlogCategoryValid,
    formValidation.isBlogReadTimeValid,
    formValidation.isBlogBodyValid,
  ]);

  useEffect(() => {
    console.log(formValues.blogImage);
  }, [formValues.blogImage]);

  return (
    <form id="create-blog">
      {/* blog title */}
      <label htmlFor="blog-title">Blog Title</label>
      <input
        onChange={(event) => {
          setFormValues((prev) => {
            return {
              ...prev,
              blogTitle: event.target.value,
            };
          });
        }}
        onFocus={() => {
          blogTitleRef.current?.classList.add("active");
        }}
        onBlur={() => {
          blogTitleRef.current?.classList.remove("active");
        }}
        type="text"
        name="blogTitle"
        id="blog-title"
        value={formValues.blogTitle ? formValues.blogTitle : ""}
        placeholder="Enter blog title"
        ref={blogTitleRef}
      />

      {/* blog introduction */}
      <label htmlFor="blog-intro">Blog Introduction</label>
      <textarea
        onChange={(event) => {
          setFormValues((prev) => {
            return {
              ...prev,
              blogIntro: event.target.value,
            };
          });
        }}
        onFocus={() => {
          blogIntroRef.current?.classList.add("active");
        }}
        onBlur={() => {
          blogIntroRef.current?.classList.remove("active");
        }}
        name="blogIntro"
        id="blog-intro"
        value={formValues.blogIntro ? formValues.blogIntro : ""}
        placeholder="Enter blog description"
        ref={blogIntroRef}
      />

      {/* category */}
      <label htmlFor="blog-category">Category</label>
      <input
        onChange={(event) => {
          setFormValues((prev) => {
            return {
              ...prev,
              blogCategory: event.target.value,
            };
          });
        }}
        onFocus={() => {
          blogCategoryRef.current?.classList.add("active");
        }}
        onBlur={() => {
          blogCategoryRef.current?.classList.remove("active");
        }}
        list="blog-categories"
        name="categories"
        id="blog-category"
        value={formValues.blogCategory ? formValues.blogCategory : ""}
        placeholder="Select blog category"
        ref={blogCategoryRef}
      />
      <datalist id="blog-categories">
        <option value="Bike Reviews" />
        <option value="Travel & Tips" />
        <option value="Parts & Accessories" />
        <option value="Latest News" />
        <option value="Maintenance" />
        <option value="Luxury Bikes" />
      </datalist>

      {/* blog image */}
      <label htmlFor="blog-image">Blog Image</label>

      <div className="img-field">
        <input
          onChange={(event) => {
            setFormValues((prev) => {
              return {
                ...prev,
                blogImage: event.target.files ? event.target.files[0] : null,
              };
            });
          }}
          type="file"
          name="blogImage"
          id="blog-image"
          accept=".jpg, .png, .jpeg"
          max={10485760}
        />
        <div
          className="selected-img"
          style={{
            background: `url(${
              formValues.blogImage
                ? URL.createObjectURL(formValues.blogImage)
                : dummyBlogImg
            })`,
          }}
        ></div>
        <label htmlFor="blog-image">Upload Photo</label>
        <p id="note-image">
          Please first fill all the other input fields and then select image.
        </p>
      </div>

      {/* read time */}
      <label htmlFor="blog-read-time">Read Time</label>
      <input
        onChange={(event) => {
          setFormValues((prev) => {
            return {
              ...prev,
              blogReadTime: event.target.valueAsNumber,
            };
          });
        }}
        onFocus={() => {
          blogReadTimeRef.current?.classList.add("active");
        }}
        onBlur={() => {
          blogReadTimeRef.current?.classList.remove("active");
        }}
        type="number"
        min={2}
        max={100}
        name="readTime"
        id="blog-read-time"
        value={formValues.blogReadTime ? String(formValues.blogReadTime) : ""}
        placeholder="Enter blog read time"
        ref={blogReadTimeRef}
      />

      {/* blog Body */}
      <label htmlFor="blog-body">Blog Body</label>
      <textarea
        onChange={(event) => {
          setFormValues((prev) => {
            return {
              ...prev,
              blogBody: event.target.value,
            };
          });
        }}
        onFocus={() => {
          blogBodyRef.current?.classList.add("active");
        }}
        onBlur={() => {
          blogBodyRef.current?.classList.remove("active");
        }}
        name="blogBody"
        id="blog-body"
        value={formValues.blogBody ? formValues.blogBody : ""}
        placeholder="Enter blog content"
        ref={blogBodyRef}
      />

      <Button
        className="solid-btn"
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          event?.preventDefault();
          uploadBlog(formValues);
        }}
        disabled={btnDisabled}
      >
        Upload Blog
      </Button>
    </form>
  );
};

export default BlogCreator;

function uploadBlog(data: BlogData) {
  const {
    blogTitle: title,
    blogIntro: intro,
    blogCategory: category,
    blogImage: image,
    blogReadTime: readTime,
    blogBody: body,
  } = data;

  if (title && intro && category && readTime && body) {
    addBlogToDB({ title, intro, category, readTime, body, image });
  }
}
