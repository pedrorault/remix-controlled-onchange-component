import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  json,
} from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react/dist/components";
import { useRef } from "react";
import Select from "react-select";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  return json({
    name: searchParams.get("name"),
    beatles: searchParams.get("beatles"),
  });
};

export const action: ActionFunction = () => {
  return null;
};

export default function Index() {
  const options = [
    { value: "John", label: "John" },
    { value: "Paul", label: "Paul" },
    { value: "Ringo", label: "Ringo" },
    { value: "George", label: "George" },
  ];

  const { name, beatles } = useLoaderData<typeof loader>();
  const submit = useRef<HTMLButtonElement>(null);

  const beatlesRef = useRef<HTMLInputElement>(null);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <p>Name: {name}</p>
      <p>Beatles: {beatles}</p>
      <hr />

      <Form style={{ width: "200px" }}>
        <button hidden type="submit" ref={submit} />
        <input hidden name="beatles" id="beatles" ref={beatlesRef} />
        <input id="name" name="name" placeholder="Name" />
        <Select
          options={options}
          defaultValue={{ value: beatles, label: beatles }}
          onChange={(e) => {
            if (beatlesRef.current) {
              beatlesRef.current.value = e?.value || "";
            }
            if (submit && submit.current) {
              submit.current.click();
            }
          }}
        />
      </Form>
    </div>
  );
}
