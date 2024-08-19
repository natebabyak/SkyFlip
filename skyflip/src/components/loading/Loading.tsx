import "./loading.css";

interface LoadingProps {
  name: string,
  url: string
}

export default function Loading(loadingProps: LoadingProps) {
  return (
    <>
      <p>
        Waiting for <a href={loadingProps.url}>{loadingProps.name}</a>...
      </p>
    </>
  )
}