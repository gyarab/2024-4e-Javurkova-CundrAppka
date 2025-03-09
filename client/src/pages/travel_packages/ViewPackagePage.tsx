import LoadingCircle from 'components/LoadingCircle'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function ViewPackagePage() {
    const { city } = useParams<string>()
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(true)

    const special_city_names: { [key: string]: string } = {
        "Plzen": "Plzeň",
        "Ceske-Budejovice": "České Budějovice",
        "Hradec-Kralove": "Hradec Králové",
        "Zlin": "Zlín"
    };

    // Parsing the text into structured sections
    const parseText = (text: string) => {
        const sections = [
            'Web',
            'Historie',
            'Zeměpis',
            'Turistické zajímavosti',
            'Kultura',
            'Restaurace, doprava a ubytování',
            'Výlety v okolí'
        ];

        const sectionData: any = {};
        let currentSection = '';
        let currentContent = '';

        // Split by lines and then process each line
        const lines = text.split('\n');
        lines.forEach(line => {
            const matchedSection = sections.find(section => line.startsWith(section));
            if (matchedSection) {
                // If we find a section, save the previous one and start new one
                if (currentSection) {
                    sectionData[currentSection] = currentContent.trim();
                }
                currentSection = matchedSection;
                currentContent = line.replace(matchedSection, '').trim();  // Clean up the section header
            } else {
                currentContent += `\n${line}`;
            }
        });

        // Add the last section to the result
        if (currentSection) {
            sectionData[currentSection] = currentContent.trim();
        }

        return sectionData;
    };

    useEffect(() => {
        const path = `/cities_info/${city}.txt`;
        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error("File not found");
                }
                return response.text();
            })
            .then(data => {
                setText(data);
                setLoading(false);
            })
            .catch(error => console.error("Error loading text file:", error));
    }, [city]);

    if (loading) {
        return <LoadingCircle />
    }

    const sections = parseText(text);

    return (
        <div>
            <h1>{special_city_names[city as keyof typeof special_city_names] || city}</h1>
            <p>Komunitni forum <a href={`/komunitni-forum/${city}`}>tady</a></p>
            <div>
                {Object.keys(sections).map((section, index) => (
                    <div key={index}>
                        <h3>{section}</h3>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{sections[section]}</p>
                    </div>
                ))}
            </div>
            <p><a href="/cestovni-balicky">Zpět</a></p>
        </div>
    )
}

export default ViewPackagePage
