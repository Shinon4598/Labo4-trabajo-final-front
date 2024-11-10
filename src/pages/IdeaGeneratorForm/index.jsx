import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../components/Input';
import NavBar from '../../components/Navbar';
import Button from '../../components/Button';
import './IdeaGeneratorForm.css';

const IdeaGeneratorForm = () => {
    const [idea, setIdea] = useState({
        nameIdea: '', 
        description: '',
        technologies: [],
        designPatterns: [],
        knowledgeLevel: '',
        purpose: '',
        theme: '', 
        userId: ''
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
        const { name, value, checked } = e.target;
        if (name === 'technologies' || name === 'designPatterns') {
            setIdea(prevState => {
                const updatedValues = checked
                    ? [...prevState[name], value]
                    : prevState[name].filter(item => item !== value);
                return {
                    ...prevState,
                    [name]: updatedValues,
                };
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

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.token || !user.userId) {
            console.error('Token o userId no encontrados');
            alert('Por favor, inicie sesión.');
            return;
        }

        if (!idea.theme || !idea.nameIdea || !idea.description || !idea.purpose || !idea.knowledgeLevel) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }

        // Convertir el array de tecnologías en una cadena con al menos 3 caracteres (separadas por comas)
        const technologiesString = idea.technologies.join(', ');

        const ideaWithUserId = { 
            ...idea, 
            technologies: technologiesString, // Ahora enviamos una cadena de tecnologías
            preferredDesignPatterns: idea.designPatterns.join(', '), // También convertimos los patrones de diseño a una cadena
            userId: user.userId 
        };

        try {
            const response = await axios.post(
                'http://localhost:3001/api/input-parameters/',
                ideaWithUserId,
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.message === 'Idea saved successfully!') {
                alert(`Idea generada con éxito: ${response.data.nameIdea}`);
            }
        } catch (error) {
            console.error('Error al generar la idea:', error);
            alert('Ocurrió un error al generar la idea.');
        }
    };

    return (
        <>
            <NavBar />
            <main className='container left'>
                <h1>Generar una idea de proyecto</h1>
                <sub>Seleccione las funciones y tecnologías que desea incluir y haga clic en «Generar idea».</sub>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Detalles de la idea</legend>
                        <Input 
                            label="Temática" 
                            type="text" 
                            name="theme" 
                            value={idea.theme} 
                            onChange={handleChange} 
                            required 
                        />
                        <Input 
                            label="Nombre de la idea" 
                            type="text" 
                            name="nameIdea" 
                            value={idea.nameIdea} 
                            onChange={handleChange} 
                            required 
                        />
                        <Input 
                            label="Descripción" 
                            type="text" 
                            name="description" 
                            value={idea.description} 
                            onChange={handleChange} 
                            required 
                        />
                        <Input 
                            label="Propósito" 
                            type="text" 
                            name="purpose" 
                            value={idea.purpose} 
                            onChange={handleChange} 
                            required 
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Nivel de experiencia</legend>
                        <div>
                            {['Principiante', 'Intermedio', 'Avanzado'].map(level => (
                                <div key={level}>
                                    <input
                                        type="radio"
                                        id={level}
                                        name="knowledgeLevel"
                                        value={level}
                                        checked={idea.knowledgeLevel === level}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={level}>{level}</label>
                                </div>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Tecnologías</legend>
                        <div>
                            {technologiesList.map(tech => (
                                <div key={tech}>
                                    <input
                                        type="checkbox"
                                        id={tech}
                                        name="technologies"
                                        value={tech}
                                        checked={idea.technologies.includes(tech)}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={tech}>{tech}</label>
                                </div>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Patrones de Diseño</legend>
                        <div>
                            {designPatternsList.map(pattern => (
                                <div key={pattern}>
                                    <input
                                        type="checkbox"
                                        id={pattern}
                                        name="designPatterns"
                                        value={pattern}
                                        checked={idea.designPatterns.includes(pattern)}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={pattern}>{pattern}</label>
                                </div>
                            ))}
                        </div>
                    </fieldset>

                    <Button type="submit" label="Generar Idea" />
                </form>
            </main>
        </>
    );
};

export default IdeaGeneratorForm;
