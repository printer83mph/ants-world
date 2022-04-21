import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import { login, signup } from '../api/auth'

const itemVariants = {
  hide: { opacity: 0, y: -50 },
  show: { opacity: 1, y: 0 },
}

const LoginPage = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isLogin = pathname === '/login'

  const { handleSubmit, register } = useForm()

  const onSubmit = async (formData: any) => {
    try {
      if (!isLogin) {
        await signup(formData)
      }
      await login(formData)
      toast.success(`Successfully ${isLogin ? 'logged in' : 'signed up'}!`)
      navigate('/')
    } catch (err) {
      // @ts-ignore
      if (err.response) {
        toast.error(
          isLogin
            ? 'Username or password is incorrect!'
            : 'Username already in use!'
        )
        return
      }
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="mx-auto mt-[10vh] max-w-md px-2">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-5"
        initial="hide"
        animate="show"
        transition={{ staggerChildren: 0.05 }}
      >
        <motion.h1
          className="text-4xl font-semibold tracking-tight"
          variants={itemVariants}
        >
          🐜 {isLogin ? 'Log In' : 'Sign Up'}
        </motion.h1>
        <motion.input
          type="text"
          {...register('username', { required: true })}
          placeholder="Username"
          className="px-3 py-2 mt-4 rounded-md outline-1 shadow-md text-lg"
          variants={itemVariants}
        />
        <motion.input
          type="password"
          {...register('password', { required: true })}
          placeholder="Password"
          className="px-3 py-2 mt-2 rounded-md outline-1 shadow-md text-lg"
          variants={itemVariants}
        />
        <motion.button
          type="submit"
          className="block w-auto mt-5 bg-blue-600 text-white px-3 py-2 text-lg rounded-md shadow hover:shadow-lg duration-200 transition-shadow"
          variants={itemVariants}
        >
          {isLogin ? 'Log In to AntsWorld' : 'Create an AntsWorld Account'}
        </motion.button>

        <motion.div
          className="mt-5 mx-auto flex flex-row gap-1 text-gray-500 tracking-wide"
          variants={itemVariants}
        >
          {isLogin ? `New to AntsWorld?` : `Already have an account?`}
          <Link to={isLogin ? '/signup' : '/login'} className="text-black">
            {isLogin ? 'Create an account' : 'Log in'}.
          </Link>
        </motion.div>
      </motion.form>
    </div>
  )
}

export default LoginPage
