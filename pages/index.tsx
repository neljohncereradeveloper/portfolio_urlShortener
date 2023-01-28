import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { getLink } from "../src/api/get";
import classnames from "classnames";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [link, setLink] = useState("");
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCopied(false);
    setLoading(true);
    try {
      const response = await getLink(input);
      if (response?.data) {
        setLink(response?.data.result.full_short_link);
      }
      setLoading(false);
    } catch (error) {
      console.log("fetching error : ", error);
      setLoading(false);
    }
  };

  const handleClickCopied = () => {
    if (link !== undefined) {
      navigator.clipboard.writeText(link);
    }
    setCopied(true);
    setInterval(() => {
      setCopied(false);
    }, 8000);
  };
  const handleChange = (e: any) => {
    validURL(e.target.value);
    setInput(e.target.value);
  };

  const validURL = (inpt: string) => {
    const pattern = new RegExp(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%\/.\w-]*)?\??(?:[-+=&;%@.\w]*)#?\w*)?)/gm
    );
    let isValidURL = !!pattern.test(inpt);
    if (isValidURL !== true) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  return (
    <div>
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="Url shortener for any website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen md:h-screen h-full flex flex-col md:flex-row">
        <div className="flex-1 bg-orange-500 grid place-items-center md:py-0 p-6 md:px-0">
          <div className="h-full w-full bg-gray-100 md:h-3/4 md:w-3/5 rounded-md flex flex-col space-y-5 py-5 px-4">
            <h1 className="text-center text-2xl font-semibold text-orange-900 tracking-normal">
              Link Shortener
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <p className="text-justify font-normal text-base tracking-normal mb-2">
                  Simply enter your URL and submit the form
                </p>
                <input
                  className="w-full rounded-md py-3"
                  type="text"
                  placeholder="Link here"
                  onChange={handleChange}
                  value={input}
                />
              </div>

              <button
                type="submit"
                className={classnames(
                  "w-full py-4 md:py-3 text-center rounded-md",
                  {
                    "bg-blue-500 hover:bg-blue-900 text-white":
                      disabled === false,
                    "bg-gray-500 text-white":
                      (disabled === true && loading === false) ||
                      (disabled === false && loading === true),
                  }
                )}
                disabled={disabled && loading ? true : false}
              >
                {loading ? "loading..." : "Submit"}
              </button>
            </form>
            {link && (
              <div className="bg-gray-100 border-1 border-gray-100 w-full px-2 py-2 shadow-lg rounded-md flex items-center">
                <span className="flex-1">{link}</span>
                <button
                  className="bg-gray-200 hover:bg-gray-500 rounded py-2 px-3 flex flex-col items-center justify-center"
                  onClick={handleClickCopied}
                >
                  <svg
                    xmlns="http://
                 www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  <span className="text-gray-900 text-sm font-normal">
                    Copy URL
                  </span>
                </button>
              </div>
            )}

            {copied && (
              <div className="bg-green-100 flex items-start p-4">
                <span className="text-green-900 font-normal">
                  URL copied successfully
                </span>
              </div>
            )}

            <p className="text-base font-normal">
              API by :{" "}
              <a
                className="text-blue-500 underline italic"
                href="https://shrtco.de/docs/"
              >
                Shrtco.de
              </a>
            </p>
          </div>
        </div>
        <div className="flex-1 bg-gray-100 flex flex-col justify-center items-center">
          <h1 className="text-orange-900 font-black text-2xl tracking-normal mt-5 md:text-5xl md:tracking-widest md:mt-0 uppercase">
            Url Shortener
          </h1>
          <p className="text-orange-900 my-4 text-justify font-normal text-base md:text-xl tracking-normal w-3/4 leading-5 md:w-2/3">
            A{" "}
            <span className="md:text-2xl text-xl font-semibold">
              URL Shortener
            </span>{" "}
            is a tool that reduces the length of your URL while ensuring
            navigation to the desired page.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
