import React, { useState } from 'react';
import { BookOpen, Brain, Smartphone, Stethoscope, Globe, ChevronRight, CheckCircle2, XCircle, Award, RotateCcw } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

const questions = [
  {
    q: "¿Cómo ha cambiado la forma de comunicarnos en las reuniones familiares?",
    options: [
      "A) Las personas hablan más cara a cara",
      "B) Pasan el tiempo mirando su celular",
      "C) No ha tenido impacto",
      "D) Ya no existen reuniones"
    ],
    correct: 1,
    expl: "La mediación excesiva de pantallas disminuye las interacciones auténticas y favorece la tecnofilia."
  },
  {
    q: "¿Qué nombre recibe la desigualdad en el acceso a internet y recursos tecnológicos?",
    options: [
      "A) Desconexión total",
      "B) Pobreza informativa",
      "C) Brecha digital",
      "D) Falta de señal"
    ],
    correct: 2,
    expl: "La brecha digital genera desigualdad social y limita el desarrollo en ámbitos educativos y laborales."
  },
  {
    q: "¿Cuál es una ventaja principal de la tecnología en la salud, según el texto original?",
    options: [
      "A) Ya no se necesitan médicos",
      "B) Telemedicina y diagnósticos remotos",
      "C) Los dispositivos curan solos",
      "D) Eliminación de registros"
    ],
    correct: 1,
    expl: "La telemedicina permite conectar médicos y pacientes a pesar de las distancias, mejorando la prevención."
  },
  {
    q: "¿De qué vocablos griegos proviene la palabra 'tecnología' según el texto?",
    options: [
      "A) Bios y Logos",
      "B) Tekne y Logos",
      "C) Chronos y Tekne",
      "D) Sophia y Logos"
    ],
    correct: 1,
    expl: "La palabra tecnología se remonta a la raíz de los vocablos griegos 'tekne' (oficio) y 'logos' (ciencia)."
  },
  {
    q: "¿Qué problema ambiental principal genera la alta demanda y rápida obsolescencia de los dispositivos?",
    options: [
      "A) Calentamiento de los océanos",
      "B) Aumento de residuos electrónicos",
      "C) Deforestación masiva",
      "D) Contaminación acústica"
    ],
    correct: 1,
    expl: "La rápida obsolescencia genera un impacto ambiental severo por la acumulación de residuos electrónicos (basura tecnológica)."
  }
];

function Header() {
  return (
    <header className="relative py-24 px-6 lg:px-8 overflow-hidden bg-slate-900 rounded-b-[3rem] shadow-2xl">
      <div className="absolute inset-0 z-0 opacity-30">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzc4NTM5MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Abstract technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center p-3 bg-blue-500/20 rounded-2xl mb-4 backdrop-blur-sm border border-blue-400/30">
          <BookOpen className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Tecnología y Sociedad
        </h1>
        <p className="text-lg md:text-2xl text-blue-100 max-w-2xl mx-auto font-light">
          Un análisis filosófico e interactivo sobre nuestro vínculo con el mundo digital y su impacto en el futuro humano.
        </p>
      </div>
    </header>
  );
}

function Section({ title, text, icon: Icon, imageSrc, imageAlt, reverse = false }) {
  return (
    <section className="group">
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}>
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm tracking-wide uppercase">
            <Icon className="w-5 h-5" />
            <span>Capítulo</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 leading-tight border-l-4 border-blue-600 pl-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {text}
          </p>
        </div>
        <div className="flex-1 w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
            <ImageWithFallback 
              src={imageSrc} 
              alt={imageAlt}
              className="w-full h-80 md:h-[400px] object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Quiz() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const startQuiz = () => {
    setHasStarted(true);
    setCurrentQ(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedOption(null);
    setIsFinished(false);
  };

  const handleOptionClick = (index: number) => {
    if (showFeedback) return;
    
    setSelectedOption(index);
    setShowFeedback(true);
    
    if (index === questions[currentQ].correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(prev => prev + 1);
      setShowFeedback(false);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
      
      <div className="relative z-10">
        {!hasStarted ? (
          <div className="text-center space-y-8 py-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 text-blue-600 rounded-full mb-4">
              <Brain className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900">¡Pon a prueba tus conocimientos!</h2>
            <p className="text-xl text-slate-600 max-w-lg mx-auto">
              Repasa lo que has leído en las secciones anteriores y demuestra tu comprensión sobre la tecnología y la sociedad.
            </p>
            <button 
              onClick={startQuiz}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-1"
            >
              Comenzar Juego <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        ) : isFinished ? (
          <div className="text-center space-y-8 py-12">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-emerald-100 text-emerald-600 rounded-full mb-4 ring-8 ring-emerald-50">
              <Award className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900">Juego Terminado</h2>
            <div className="text-6xl font-black text-blue-600">
              {score} <span className="text-3xl text-slate-400 font-medium">/ {questions.length}</span>
            </div>
            <p className="text-xl text-slate-600 font-medium">
              {score === questions.length ? "¡Increíble! Entiendes todo perfectamente. 🌟" : "¡Buen trabajo! Sigue explorando. 👍"}
            </p>
            <button 
              onClick={startQuiz}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-lg px-8 py-4 rounded-xl transition-all mt-4"
            >
              <RotateCcw className="w-5 h-5" /> Volver a intentar
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
              <span>Pregunta {currentQ + 1} de {questions.length}</span>
              <span className="text-blue-600">Puntuación: {score}</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              {questions[currentQ].q}
            </h3>
            
            <div className="grid gap-4 mt-8">
              {questions[currentQ].options.map((opt, index) => {
                let buttonStyle = "bg-white border-slate-200 text-slate-700 hover:border-blue-500 hover:bg-blue-50";
                
                if (showFeedback) {
                  if (index === questions[currentQ].correct) {
                    buttonStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500";
                  } else if (index === selectedOption) {
                    buttonStyle = "bg-red-50 border-red-500 text-red-800";
                  } else {
                    buttonStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
                  }
                }

                return (
                  <button
                    key={index}
                    disabled={showFeedback}
                    onClick={() => handleOptionClick(index)}
                    className={`text-left p-6 rounded-2xl border-2 transition-all font-medium text-lg ${buttonStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className={`mt-8 p-6 rounded-2xl flex items-start gap-4 ${
                selectedOption === questions[currentQ].correct ? 'bg-emerald-100/50 text-emerald-900' : 'bg-red-100/50 text-red-900'
              }`}>
                {selectedOption === questions[currentQ].correct ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold text-xl mb-2">
                    {selectedOption === questions[currentQ].correct ? '¡Correcto!' : 'Incorrecto'}
                  </h4>
                  <p className="text-lg opacity-90">{questions[currentQ].expl}</p>
                  
                  <button 
                    onClick={nextQuestion}
                    className="mt-6 inline-flex items-center gap-2 bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    {currentQ + 1 < questions.length ? 'Siguiente Pregunta' : 'Ver Resultados'} <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 selection:bg-blue-200">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-20 space-y-32">
        <Section 
          icon={Globe}
          title="La Definición de Tecnología y el Auge de la Tecnocracia"
          text="Para comprender el mundo actual, es necesario remontarse a la raíz del término tecnología, el cual proviene de los vocablos griegos tekne (oficio) y logos (ciencia). En las últimas décadas, la sociedad se enfrenta a una 'tecnocracia', un sistema donde las naciones se valoran por su éxito económico y técnico, desplazando los valores humanos. Este paradigma ha transformado no solo la economía, sino también nuestra manera de interactuar, privilegiando la eficiencia por encima de la ética y la empatía en nuestras decisiones diarias."
          imageSrc="https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzc4NTM5MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          imageAlt="Abstract technology connections"
        />

        <Section 
          icon={Smartphone}
          title="Comunicación Global frente al Aislamiento Social"
          text='El avance de las telecomunicaciones presenta una paradoja; si bien facilita la organización civil y permite conectar a personas separadas por miles de kilómetros en tiempo real, también existe el riesgo de la "tecnofilia". En este fenómeno, la relación virtual reemplaza el contacto auténtico en los hogares y espacios públicos. Cada vez es más común observar familias o grupos de amigos donde el silencio domina mientras las pantallas acaparan toda la atención, creando islas de aislamiento en medio de la compañía.'
          imageSrc="https://images.unsplash.com/photo-1622674343958-1cb1ae9f9ce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjB1c2luZyUyMHBob25lcyUyMHRvZ2V0aGVyJTIwaWdub3JpbmclMjBlYWNoJTIwb3RoZXJ8ZW58MXx8fHwxNzc4NjkyMTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          imageAlt="People on their phones ignoring each other"
          reverse
        />

        <Section 
          icon={Brain}
          title="Transformación Laboral y el Desafío de la Educación"
          text="La inteligencia artificial y la robótica han mejorado la productividad a niveles sin precedentes, optimizando procesos y resolviendo problemas complejos en segundos. Pero también han provocado el desplazamiento de mano de obra humana en sectores tradicionales. La brecha digital sigue siendo una preocupación crítica para la formación profesional; hoy en día, el analfabetismo tecnológico es una barrera enorme para el desarrollo, exigiendo a los sistemas educativos una adaptación urgente para preparar a las futuras generaciones."
          imageSrc="https://images.unsplash.com/photo-1563968743333-044cef800494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZmFjdG9yeXxlbnwxfHx8fDE3Nzg2OTIxOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          imageAlt="Artificial intelligence in factory"
        />

        <Section 
          icon={Stethoscope}
          title="Salud, Bienestar y el Impacto Ambiental"
          text='Se identifican patologías modernas vinculadas al abuso técnico, como la fatiga visual, el insomnio provocado por la luz azul y el "pulgar de mensaje". Además de la salud individual, está el enorme costo ecológico: la alta demanda de dispositivos de rápida obsolescencia genera un impacto ambiental severo por residuos electrónicos. Las montañas de basura tecnológica en países en desarrollo son un recordatorio constante de que nuestro confort digital tiene un precio tangible para el planeta.'
          imageSrc="https://images.unsplash.com/photo-1762542530803-18c4223557dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwd2FzdGUlMjBwb2xsdXRpb258ZW58MXx8fHwxNzc4NjkyMTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          imageAlt="Electronic waste pollution"
          reverse
        />

        <div className="pt-12">
          <Quiz />
        </div>
      </main>
    </div>
  );
}
