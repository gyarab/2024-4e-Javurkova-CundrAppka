function PackagesPage() {
    const cities: string[] = [
        "Praha",
        "Brno"
    ]
    
  return (
    <div>
       {cities.map((city, index) => (
        <>
            <h3>{city}</h3>
            <p>url k infu v txt: {`assets/cities_info/${city}.txt`}</p>
            <p>Odkaz <a href={`/cestovni-balicky/${city}`}>Tady</a></p>
        </>
      ))}
    </div>
  )
}

export default PackagesPage