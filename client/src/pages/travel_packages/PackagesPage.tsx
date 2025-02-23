function PackagesPage() {
    const cities: string[] = [
        "Praha",
        "Brno"
    ]
    
  return (
    <div>
       {cities.map((city, index) => (
        <>
            <h3><a href={`/cestovni-balicky/${city}`}>{city}</a></h3>
        </>
      ))}
    </div>
  )
}

export default PackagesPage