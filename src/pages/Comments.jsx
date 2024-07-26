/* eslint-disable prettier/prettier */
import { Form, useActionData, useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { v4 as uuid4 } from "uuid";
import Fallback from "./Fallback";

export default function Comments() {
  const errors = useActionData();
  const data = useLoaderData();
  return (
    <>
      <Suspense fallback={<Fallback />}>
        <Await resolve={data.comments}>
          {(loadedData) => {
            if (!loadedData || loadedData.length === 0) {
              return <p>No comments on this post</p>;
            }
            return (
              <section>
                {loadedData?.map((comment) => (
                  <p key={uuid4()}>{comment}</p>
                ))}
              </section>
            );
          }}
        </Await>
      </Suspense>
      <Form method="post">
        <input
          type="text"
          placeholder="write your comment here"
          name="comment"
        />
        {errors?.comment && <p>{errors.comment}</p>}
        <input type="submit" />
        {errors?.notLoggedIn && <p>{errors.notLoggedIn}</p>}
        {errors?.submit && <p>{errors.submit}</p>}
      </Form>
    </>
  );
}
