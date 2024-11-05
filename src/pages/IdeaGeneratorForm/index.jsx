import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../components/Input';
import NavBar from '../../components/Navbar';
import RadioButton from '../../components/RadioButton';
import CheckBox from '../../components/CheckBox';
import './IdeaGeneratorForm.css'
import Button from '../../components/Button';

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
        const { name, value, checked } = e.target;
        if (name === 'technologies' || name === 'designPatterns') {
            console.log(idea.technologies);
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
        <>
            <NavBar/>
            <main className='container left'>
            <h1>Generar una idea de proyecto</h1>
            <sub>Seleccione las funciones y tecnologías que desea incluir y haga clic en «Generar idea».</sub>
            <form onSubmit={handleSubmit}>
            <fieldset>
                    <legend>Detalles de la idea</legend><Input 
                    label="Temática" 
                    type="text" 
                    name="ideaName"
                    value={idea.ideaName} 
                    onChange={handleChange} 
                    required={true}>
                </Input>
                <Input 
                    label="Descripción" 
                    type="text" 
                    name="description"
                    value={idea.description} 
                    onChange={handleChange} 
                    required={true}>
                </Input>
                </fieldset>
                <fieldset>
                    <legend>Nivel de experiencia</legend>
                    <RadioButton 
                        label="Principiante" 
                        name="knowledgeLevel" 
                        value="Principiante" 
                        checked={idea.knowledgeLevel === 'Principiante'} 
                        onChange={handleChange}
                    /> 
                    <RadioButton 
                        label="Intermedio" 
                        name="knowledgeLevel" 
                        value="Intermedio" 
                        checked={idea.knowledgeLevel === 'Intermedio'} 
                        onChange={handleChange}
                    /> 
                    <RadioButton 
                        label="Avanzado" 
                        name="knowledgeLevel" 
                        value="Avanzado" 
                        checked={idea.knowledgeLevel === 'Avanzado'} 
                        onChange={handleChange}
                    /> 
                </fieldset>
                
                
                <fieldset>
                    <legend>Tecnologías (Selecciona múltiples):</legend>
                    <div className="checkbox-grid">
                        {technologiesList.map(tech => (
                            <CheckBox 
                                key={tech}
                                label={tech}
                                checked={idea.technologies.includes(tech)} 
                                onChange={handleChange} 
                                name="technologies" 
                                value={tech}
                            >
                            </CheckBox>                                

                        ))}
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Patrones de Diseño (Selecciona múltiples):</legend>
                    <div className="checkbox-grid">
                        {designPatternsList.map(pattern => (
                            <CheckBox 
                                key={pattern}
                                label={pattern}
                                checked={idea.technologies.includes(pattern)} 
                                onChange={handleChange} 
                                name="technologies" 
                                value={pattern}
                            >
                            </CheckBox>      
                            
                        ))}
                    </div>
                </fieldset>
                <Button type='submit'>Generar Idea</Button>
            </form>
            </main>
            
        </>
    );
};

export default IdeaGeneratorForm;
