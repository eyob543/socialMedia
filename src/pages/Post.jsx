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
      <label htmlFor="image" className="text-lg">
        Choose a photo or video to post
      </label>
      <input type="file" name="image" accept="image/*,video/*" />
      <input
        type="text"
        placeholder="description"
        className="p-1 px-2 rounded-sm text-lg"
        name="description"
      />
      <input
        className="bg-slate-300 p-1 rounded w-32 self-center text-black text-lg font-semibold hover:cursor-pointer hover:bg-slate-400 "
        type="submit"
      />
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
