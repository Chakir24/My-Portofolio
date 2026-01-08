export default function Background() {
  return (
    <div className="background">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="bubble"></div>
      ))}
    </div>
  )
}

