import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../components/Input';
import NavBar from '../../components/Nav-bar';
import Button from '../../components/Button';
import Select from 'react-select';
import ErrorMessage from '../../components/Error-message';
import SelectOne from '../../components/SelectOne';

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

  const [errors, setErrors] = useState({});

  const technologiesList = [
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Express', label: 'Express' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'MySQL', label: 'MySQL' },
    { value: 'Python', label: 'Python' }
  ];

  const designPatternsList = [
    { value: 'Singleton', label: 'Singleton' },
    { value: 'Observer', label: 'Observer' },
    { value: 'Factory', label: 'Factory' },
    { value: 'Strategy', label: 'Strategy' },
    { value: 'Decorator', label: 'Decorator' }
  ];

  const handleChange = (name, value) => {
    setIdea(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: undefined
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (idea.theme.length < 3 || idea.theme.length > 30) {
      newErrors.theme = 'La temática debe tener entre 3 y 30 caracteres.';
    }
    if (idea.description.length < 10 || idea.description.length > 250) {
      newErrors.description =
        'La descripción debe tener entre 10 y 250 caracteres.';
    }
    if (idea.purpose.length < 3 || idea.purpose.length > 30) {
      newErrors.purpose = 'El propósito debe tener entre 3 y 30 caracteres.';
    }
    if (!idea.knowledgeLevel) {
      newErrors.knowledgeLevel =
        'Por favor, seleccione un nivel de experiencia.';
    }
    setErrors(newErrors);
    return Object.values(newErrors).filter(value => !!value).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!validateForm()) {
      console.log('Formulario inválido:', errors);
      return;
    }

    const technologiesString = idea.technologies.join(', ');
    const ideaWithUserId = {
      ...idea,
      technologies: technologiesString,
      preferredDesignPatterns: idea.designPatterns.join(', '),
      userId: user.userId
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/api/input-parameters/',
        ideaWithUserId,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.message === 'Idea saved successfully!') {
        alert(`Idea generada con éxito:`);
      }
    } catch (error) {
      console.error('Error al generar la idea:', error);
      alert('Ocurrió un error al generar la idea.');
    }
  };

  return (
    <>
      <NavBar />
      <main className="container mx-auto my-14">
        <h1 className="text-2xl font-bold mb-2 text-indigo-950 text-center">
          Generar una idea de proyecto
        </h1>
        <form onSubmit={handleSubmit} className="w-full px-52">
          <fieldset className="fieldset">
            <legend className="font-bold mb-4 text-indigo-950">
              Detalles de la idea
            </legend>
            <div className="row">
              <Input
                label="Temática"
                type="text"
                name="theme"
                value={idea.theme}
                onChange={e => handleChange('theme', e.target.value)}
                required
              />
              {errors.theme && <p className="error-text">{errors.theme}</p>}

              <Input
                label="Propósito"
                type="text"
                name="purpose"
                value={idea.purpose}
                onChange={e => handleChange('purpose', e.target.value)}
                required
              />
              {errors.purpose && <p className="error-text">{errors.purpose}</p>}
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={idea.description}
                onChange={e => handleChange('description', e.target.value)}
                maxLength="250"
                rows="6"
                placeholder="Describe tu idea en 250 caracteres o menos"
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
              ></textarea>
              {errors.description && (
                <ErrorMessage message={errors.description} />
              )}
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="font-bold mb-4 text-indigo-950">
              Tecnologías y patrones de diseño
            </legend>

            <label htmlFor="technologies">Tecnologías</label>
            <Select
              id="technologies"
              name="technologies"
              isMulti
              options={technologiesList}
              className="multi-select"
              onChange={selectedOptions =>
                handleChange(
                  'technologies',
                  selectedOptions.map(option => option.value)
                )
              }
            />

            <label htmlFor="designPatterns">Patrones de diseño</label>
            <Select
              id="designPatterns"
              name="designPatterns"
              isMulti
              options={designPatternsList}
              className="multi-select"
              onChange={selectedOptions =>
                handleChange(
                  'designPatterns',
                  selectedOptions.map(option => option.value)
                )
              }
            />
            <SelectOne
              label={'Nivel de Conocimiento'}
              name={'knowledgeLevel'}
              value={idea.knowledgeLevel}
              onChange={e => handleChange('knowledgeLevel', e.target.value)}
              required={true}
              options={[
                { value: 'beginner', label: 'Principiante' },
                { value: 'intermediate', label: 'Intermedio' },
                { value: 'advanced', label: 'Avanzado' }
              ]}
            />
            {errors.knowledgeLevel && (
              <ErrorMessage message={errors.knowledgeLevel} />
            )}
          </fieldset>

          <Button type="submit" title="Enviar">
            Enviar
          </Button>
        </form>
      </main>
    </>
  );
};

export default IdeaGeneratorForm;
