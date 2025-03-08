function PackagesPage() {
  const cities: { [key: string]: string } = {
    "Praha": "Praha",
    "Brno": "Brno",
    "Ostrava": "Ostrava",
    "Plzen": "Plzeň",
    "Liberec": "Liberec",
    "Olomouc": "Olomouc",
    "Ceske-Budejovice": "České Budějovice",
    "Hradec-Kralove": "Hradec Králové",
    "Zlin": "Zlín",
    "Pardubice": "Pardubice"
  };
    
  return (
    <div>
       {Object.entries(cities).map(([key, value], index) => (
          <div key={index}>
              <h3><a href={`/cestovni-balicky/${key}`}>{value}</a></h3>
            </div>
        ))}
    </div>
  )
}

export default PackagesPage