import React, { useState } from 'react';
import axios from 'axios';

const IdeaGeneratorForm = () => {
    const [idea, setIdea] = useState({
        ideaName: '',
        description: '',
        technologies: [],
        designPatterns: [],
        knowledgeLevel: '',
        purpose: '',
    });

    const technologiesList = [
        "React", "Node.js", "Express", "MongoDB", "MySQL",
        "Python", "Django", "Flask", "Java", "Spring",
        "Ruby", "Rails", "PHP", "Laravel", "C#",
        "ASP.NET", "HTML/CSS", "TypeScript", "GraphQL", "Vue.js", "Angular"
    ];

    const designPatternsList = [
        "Singleton", "Observer", "Factory", "Strategy",
        "Decorator", "Facade", "Adapter", "Proxy",
        "Command", "Iterator", "Composite", "Builder", "Prototype"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'technologies' || name === 'designPatterns') {
            const values = Array.from(e.target.checked ? [value] : []);
            setIdea({
                ...idea,
                [name]: values.length ? [...idea[name], ...values] : idea[name].filter(v => v !== value),
            });
        } else {
            setIdea({
                ...idea,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Obtiene el token del localStorage
            const response = await axios.post('http://localhost:3001/api/input-parameters/', idea, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Añade el token en los encabezados
                },
            });
            console.log(response.data); // Maneja la respuesta de la API según lo necesites
        } catch (error) {
            console.error('Error al enviar la idea:', error);
        }
    };

    return (
        <div className="idea-generator-form">
            <h1>Generador de Ideas</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Temática:
                    <input
                        type="text"
                        name="ideaName" // Asegúrate de que el nombre coincida con la API
                        value={idea.ideaName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Descripción:
                    <input
                        type="text"
                        name="description"
                        value={idea.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <fieldset>
                    <legend>Tecnologías (Selecciona múltiples):</legend>
                    <div className="checkbox-grid">
                        {technologiesList.map(tech => (
                            <label key={tech}>
                                <input
                                    type="checkbox"
                                    value={tech}
                                    checked={idea.technologies.includes(tech)}
                                    onChange={handleChange}
                                    name="technologies"
                                />
                                {tech}
                            </label>
                        ))}
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Patrones de Diseño (Selecciona múltiples):</legend>
                    <div className="checkbox-grid">
                        {designPatternsList.map(pattern => (
                            <label key={pattern}>
                                <input
                                    type="checkbox"
                                    value={pattern}
                                    checked={idea.designPatterns.includes(pattern)}
                                    onChange={handleChange}
                                    name="designPatterns"
                                />
                                {pattern}
                            </label>
                        ))}
                    </div>
                </fieldset>
                <label>
                    Nivel de Conocimiento:
                    <select
                        name="knowledgeLevel"
                        value={idea.knowledgeLevel}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar</option>
                        <option value="Básico">Básico</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                    </select>
                </label>
                <label>
                    Propósito:
                    <input
                        type="text"
                        name="purpose" // Asegúrate de que el nombre coincida con la API
                        value={idea.purpose}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Generar Idea</button>
            </form>
        </div>
    );
};

export default IdeaGeneratorForm;
