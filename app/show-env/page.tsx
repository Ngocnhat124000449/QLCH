export default function ShowEnv() {
  return (
    <div style={{ padding: 20 }}>
      <h1>DATABASE_URL</h1>
      <pre>{process.env.DATABASE_URL ?? "undefined"}</pre>
    </div>
  );
}
