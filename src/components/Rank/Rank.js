const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="tc white">
        <h2>{name}, your current rank is</h2>
        <h2>#{entries}</h2>
      </div>
    </div>
  )
}

export default Rank;