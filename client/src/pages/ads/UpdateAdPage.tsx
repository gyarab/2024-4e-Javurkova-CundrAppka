import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetchSingleAd from 'hooks/ads/useFetchSingleAd'
import useUpdateAd from 'hooks/ads/useUpdateAd'
import { Ad } from 'models/ad'

function UpdateAdPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { ad, loading: loadingAd } = useFetchSingleAd(id!)
  const { updateAd, loading: updating } = useUpdateAd()
  
  const [formData, setFormData] = useState<Ad>({} as Ad);

  useEffect(() => {
    if (ad) {
      const newFormData: any = {};
  
      // Filter out non-editable fields like _id, createdAt, updatedAt
      Object.entries(ad).forEach(([key, value]) => {
        if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v' && value !== undefined) {
          newFormData[key] = value;
        }
      });
  
      setFormData(newFormData);
    }
  }, [ad]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Handle nested fields by using the name structure to traverse the nested object
    const nameParts = name.split('.'); // Split name into parts to handle nested structure
    let newValue = value;
  
    setFormData((prevState) => {
      let updatedData = { ...prevState };
  
      // Traverse the object using the name parts
      let temp = updatedData;
      for (let i = 0; i < nameParts.length - 1; i++) {
        temp = temp[nameParts[i]] ?? {}; // Navigate to the next nested object
      }
  
      // Update the nested field value
      temp[nameParts[nameParts.length - 1]] = newValue;
  
      return updatedData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (id) {
        const success = await updateAd(id, formData);
      if (success) {
        navigate(`/inzeraty/${id}`)
      } else {
        alert('Nastal problém při uprave inzerátu')
      }
    }
  }

  if (loadingAd || updating) return <p>Načítání...</p>

  const labels: { [key: string]: string } = {
    title: "Název",
    description: "Popis",
    name: "Celé jméno",
    email: "Email",
    phone: "Telefonní číslo",
    destination: "Destinace",
    date: "Datum",
    gender: "Pohlaví",
    minAge: "Minimální věk",
    maxAge: "Maximální věk",
    languages: "Jazyky",
    smokingPreference: "Kuřácká preference"
  };


  const renderNestedFields = (obj: any, parentKey: string): JSX.Element[] => {
    return Object.entries(obj).flatMap(([key, value]) => {
      // If the value is an object, we need to handle it differently
      if (typeof value === 'object' && value !== null) {
        // Recursively render nested fields if it's another object
        return renderNestedFields(value, `${parentKey}.${key}`);
      }
  
      // Ensure value is either string, number, or undefined
      const inputValue = value ?? '';  // If value is null or undefined, fallback to ''
      
      // For non-object values, render input
      return [
        <div key={key}>
          <label>
          {labels[key] || key}: {/* Dynamic label based on the parent key */}
            <input
              name={`${parentKey}.${key}`}  // Naming convention for nested properties
              value={inputValue as string}  // Explicitly cast to string
              onChange={handleChange}
            />
          </label>
        </div>
      ];
    });
  };


  return (
    <div>
      <h1>Upravit Inzerát</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => {
          const value = formData[key];
          
          // Skip fields that should not be displayed (e.g., _id, createdAt)
          if (key === '_id' || key === 'createdAt' || key === 'updatedAt' || key === 'user' || key === 'email' || key === 'full_name') return null;

          // Handle nested objects like contactInfo or preferences
          if (typeof value === 'object' && value !== null) {
            return renderNestedFields(value, key);
          }

          // For simple fields (non-object)
          return (
            <div key={key}>
              <label>
                {labels[key] || key}: {/* Use custom labels if available */}
                <input
                  name={key}
                  value={value || ''}
                  onChange={handleChange}
                />
              </label>
            </div>
          );
        })}
      <button type="submit">Uložit změny</button>
      </form>
      <p><a href={`/inzeraty/${id}`}>Zpátky</a></p>
    </div>
  )
}

export default UpdateAdPage
