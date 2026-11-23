"use client";
export default function ErrorPage({ reset }) {
  return (
    <div className="container empty-state error-page">
      <h1>Something didn’t load.</h1>
      <p>
        Please try again. The rest of the portfolio is still available from the
        navigation.
      </p>
      <button className="button primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
