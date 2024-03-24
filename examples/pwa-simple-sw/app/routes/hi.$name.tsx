import { json, useLoaderData } from "@remix-run/react";

type Params = {
  name: string;
};

export const loader = ({ params }: { params: Params }) => {
  return json(params);
};

export default function Hi() {
  const date = "__DATE__";
  const params = useLoaderData<typeof loader>();

  return (
    <div>
      <div>
        <strong>/hi</strong> route, built at: {date}
      </div>
      <p>
        Hi:
        {params.name}
      </p>
      <br />
      <a href="/">Go Home</a>
    </div>
  );
}
