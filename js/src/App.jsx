import { useForm } from "react-hook-form"

function App() {

  const { register, handleSubmit, formState: { errors }, watch, setValue,reset } = useForm() // podriamos pasar defaultValues useForm({defaultvalues:{}}) 

  // setValue para setear valores o reset para resetear los valores

  const onSubmit = handleSubmit((data) => {
    console.log(data)

    alert("enviado")
    reset()
  })

  

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-slate-800">
        Formulario
      </h1>
      <form className="space-y-10" onSubmit={onSubmit}>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">Email</span>
          <input type="email" {...register('email', {
            required: {
              value: true,
              message: "Correo requerido"
            },
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Correo invalido"
            }
          })} className="input" />
          {
            errors.email && <span className="text-red-400 opacity-75 text-sm">{errors.email.message}</span>
          }

        </label>


        <label className="block">
          <span className="block text-sm font-medium text-slate-700">Password</span>
          <input type="password" {...register('password', {
            required: {
              value: true,
              message: " la contraseña es requerida"
            },
            minLength: {
              value: 2,
              message: "ddebe teber dos caracteres como minimo"
            },
            maxLength: {
              value: 9,
              message: "como maximo debe  teber 9 caracteres"
            }
          })} className="input" />
          {
            errors.password && <span className="text-red-400 opacity-75 text-sm">{errors.password.message}</span>
          }
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-slate-700">Confirmar Password</span>
          <input type="password" {...register('confirmPassword', {
            required: {
              value: true,
              message: "la confirmacion de la contraseña es requerida"
            },
            validate: (value) => value === watch('password') || "las contraseñas no coinciden"
          })} className="input" />
          {
            errors.confirmPassword && <span className="text-red-400 opacity-75 text-sm">{errors.confirmPassword.message}</span>
          }
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-slate-700">Fecha de nacimiento</span>
          <input type="date" {...register('date', {
            required: {
              value: true,
              message: "la fecha es requerida"
            },
            validate: (value) => {
              const dateInput = new Date(value)
              const fechaActual = new Date()
              const edad = fechaActual.getFullYear() - dateInput.getFullYear()

              if (edad < 18) {
                return "debe ser mayor de edad"
              }

            }
          })} className="input" />
          {
            errors.date && <span className="text-red-400 opacity-75 text-sm">{errors.date.message}</span>
          }
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-slate-700">Pais</span>
          <select {...register('pais', {
            required: {
              value: true,
              message: "el pais es requerido"
            }
          })} >
            <option value="CO">Colombia</option>
            <option value="PE">Peru</option>
            <option value="ME">Mexico</option>
          </select>
        </label>
        {
          errors.pais && <span className="text-red-400 opacity-75 text-sm">{errors.pais.message}</span>

        }
        {
      
          watch('pais') === 'PE' && (
            <>
              <label className="block">
                <span className="block text-sm font-medium text-slate-700">Provincia</span>
                <select {...register('provincia', {
                  required: {
                    value: true,
                    message: "la provincia es requerida"
                  }
                })} >
                  <option value="">
                    escoge una provincia
                  </option>
                  <option value="LIM">Lima</option>
                  <option value="ARE">Arequipa</option>
                  <option value="CUS">Cusco</option>
                </select>
                {
                  errors.provincia && <span className="text-red-400 opacity-75 text-sm">{errors.provincia.message}</span>
                }
              </label>
            </>
          )
        }

        <label className="block" htmlFor="photo">
          <span className="block text-sm font-medium text-slate-700">Foto de perfil</span>
          <input type="file"
          //  {...register('photo', {
          //   required: {
          //     value: true,
          //     message: "la foto es requerida"
          //   },
          //   validate: (value) => {
          //     const file = value[0]
          //     const size = file.size / 1024 / 1024


          //     if (size > 2) {
          //       return "la imagen no debe pesar mas de 2mb"
          //     }
          //   }
          // })} 

          onChange={(e)=>{
            setValue('photo', e.target.files[0].name)
          }}
          
          />
          {
            errors.photo && <span className="text-red-400 opacity-75 text-sm">{errors.photo.message}</span>
          }
        </label>

        <button className="py-2 px-5 bg-violet-500 text-white font-semibold rounded-md   shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
          Eviar
        </button>
        <pre>
          {JSON.stringify(watch(), null, 2)}
        </pre>
      </form>
    </div>
  )
}

export default App
