import { useActionData, Form } from "react-router-dom";
// eslint-disable-next-line react-refresh/only-export-components

export default function Post() {
  const errors = useActionData();

  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="flex justify-center flex-col gap-5"
    >
      <input type="text" placeholder="image url" name="url" />
      <input type="text" placeholder="description" name="description" />
      <label htmlFor="image">Choose a photo or video to post</label>
      <input type="file" name="image" accept="image/*,video/*" />
      <input type="submit" />
      {errors?.post && (
        <p className="text-red-400 text-lg font-semibold">{errors.post}</p>
      )}
      {errors?.typeMismatch && (
        <p className="text-red-400 text-lg font-semibold">
          {errors.typeMismatch}
        </p>
      )}
      {errors?.success && (
        <p className="text-green-400 text-lg text-center">{errors.success}</p>
      )}
    </Form>
  );
}
