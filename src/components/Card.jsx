export default function Card({idea, parameter, createdAt, recommTech, designPatterns, additionalFeatures, knowledgeLevel, generationDate, theme,  preferredPatterns, parameterDescription}) {
    return (
        <div class="w-full">
            <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-[20px] p-4 flex flex-col justify-between leading-normal">
                <div class="mb-8">
                <p class="text-sm text-gray-600">
                    {createdAt}
                </p>
                <div class="text-gray-900 font-bold text-xl mb-2">{idea}</div>
                <p class="text-gray-700 text-base">{theme}</p>
                </div>
                <div class="text-sm">
                    <p class="text-gray-900 leading-none">{parameter}</p>
                    <p class="text-gray-600">Tecnologias Recomendadas : {recommTech}</p>
                    <p class="text-gray-600">Patrones de diseño : {designPatterns}</p>
                    <p class="text-gray-600">Fecha de generación: {generationDate}</p>
                    <p class="text-gray-600">Caracteristicas adicionales: {additionalFeatures}</p>
                    <p class="text-gray-600">Nivel de conocimiento : {knowledgeLevel}</p>
                    <p class="text-gray-600">Patrones preferidos : {preferredPatterns}</p>
                    <p class="text-gray-600">{parameterDescription}</p>
                </div>
            </div>
            </div>

    )
}