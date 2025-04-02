import React, {useEffect, useState,useRef } from 'react'
import { motion} from 'framer-motion'
import video from '../../public/vectors/v1.mp4'
import { sendOTP, verifyOTP, register, login , getCurrentUser } from '../Services/authService'
import { useNavigate} from 'react-router-dom'

function Landing() {
    const [visible,setVisible] = useState(false)
    const [signup,setSignup] = useState(false)
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
    const getStarted=()=>{
      if(signup)setSignup(false);
      else{
        setVisible((prev)=>!prev);
      }
    }
  return (
    <div className='w-screen min-h-screen h-fit relative flex items-center justify-center'>
        <>
          <video className='absolute w-full h-screen object-cover opacity-25 pointer-events-none' src={video} autoPlay loop muted/>
          <div className='w-screen h-screen flex items-center justify-center'>
              <motion.div 
              initial={{x:'0%'}}
              animate={{x:visible?'0%':'50%'}}
              transition={{duration:0.5,type:'spring',stiffness:250}}
              className={`w-1/2  h-fit ${width<768 && visible ? 'hidden' : 'flex'} flex-col items-center justify-center text-center`}>
                <motion.h1 className='w-fit h-fit text-7xl mb-4'>BIZZY</motion.h1>
                <motion.h3 className='w-fit h-fit text-2xl mb-2 text-gray-500'>Because inventory shouldn't keep you busy</motion.h3>
                <motion.h5 className='w-3/4 h-fit text-md text-center text-gray-500'>Never worry about running out of key items again, and say goodbye to the stress of overstocking.  Bizzy lets you focus on running your business, not your inventory.</motion.h5>
                <motion.div
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
                onClick={getStarted}
                className={`relative outline-none w-36 px-5 py-2 h-10 mt-4 text-center select-none ${visible||signup?'bg-black':'bg-blue-500'} backdrop-blur-0 text-white rounded-md`}>
                    {visible||signup?'Back':'Get Started'}
                </motion.div>
              </motion.div>
              <motion.div
              initial={{x:'100%'}}
              animate={{x:visible?'0%':'100%'}}
              transition={{duration:0.5,type:'spring',stiffness:250}}
              className={`w-full  ${width<768 && visible ? 'sm:w-3/4' : 'sm:w-1/2'} h-screen flex items-center justify-center shrink-0`}><SignUp signup={signup} setSignup={setSignup}/></motion.div>
          </div>
        </>
    </div>
  )
}

function SignUp({signup,setSignup}) {
  const [sendOtp,setSendOtp] = useState(false)
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [login,setLogin] = useState(false);
  const inputRefs = useRef([]);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    businessName: "",
    businessType: "",
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const response = await register(formData);
    window.location.reload();
    if(response.success){
      setFormData({ name: "", password: "", businessName: "", businessType: "" });
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.length > 1) e.target.value = value.slice(0, 1);

    const newOtp = otp.split('');
    newOtp[index] = e.target.value;
    setOtp(newOtp.join(''));
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
      
    }
    if (value.length === 0 && index >0) {
      inputRefs.current[index - 1].focus();
      
    }
  };
  useEffect(() => {
    setSendOtp(false);
  }, [signup,setSignup]);

  const sendCode = async () => {
    const response = await sendOTP(email);
    if(response.success)setSignup(true);
  };
  const verifyCode = async () => {
    const response = await verifyOTP(otp);
    if(response.success){
      setSendOtp(true);
      setEmail("");
      setOtp("");
      inputRefs.current.forEach((input, index) => {
        input.value = "";
      });
    }
    else alert('Invalid OTP');
  };
  return (
    <div className='w-11/12 h-3/4 bg-white/30 p-4 border border-white rounded-2xl shadow-2xl shadow-blue-400/30 backdrop-blur-xl'>
        { login ? <Login setLogin={setLogin}/> :
        <>
        <h1 className='text-2xl h-1/4 px-3 flex justify-start items-center text-blue-400'>{sendOtp?'Setup your Profile':'Let\'s tame your inventory. Sign up today!'}</h1>
        <div className='w-full h-3/4  flex items-center justify-center'>
          <motion.div
          initial={{display:'flex',opacity:1}}
          animate={{display:signup&&sendOtp?'none':'flex',opacity:signup&&sendOtp?0:1}}
          transition={{duration:0.2,type:'easeInOut'}}
          className='w-full h-full flex flex-col shrink-0 gap-4 items-center justify-center'>
            <input value={email} onChange={(e)=>(setEmail(e.target.value))} className='w-3/4 h-12 mb-2 border-b-2 border-gray-300 bg-transparent drop-shadow-xl shadow-blue-300 outline-none px-3 ring-2 ring-gray-200 focus:ring-blue-400 rounded-lg' placeholder='Email'/>
            <>
              {signup ?
                <>
                  <div className='flex gap-2'>
                    {[...Array(6)].map((_, index) => (
                      <input
                        key={index}
                        ref={(el) => inputRefs.current[index] = el}
                        className='w-12 h-12 border-b-2 rounded-xl border-gray-300 bg-transparent drop-shadow-xl shadow-blue-300 outline-none ring-2 ring-gray-200 focus:ring-blue-400 text-center text-lg'
                        maxLength='1'
                        type='text'
                        inputMode='numeric'
                        onChange={(e) => handleChange(e, index)}
                      />
                    ))}
                  </div>
                  <motion.div
                  whileHover={{scale:1.1}}
                  whileTap={{scale:0.9}}
                  onClick={verifyCode}
                  className='w-1/2 h-fit py-2 bg-blue-500 text-2xl text-white rounded-md text-center cursor-pointer select-none'>
                    Sign Up
                  </motion.div>
                </>
              : ""}
              {!signup ?
                <motion.div
                  whileHover={{scale:1.1}}
                  whileTap={{scale:0.9}}
                  onClick={email!==''&&sendCode}
                  className='w-1/2 h-fit py-2 bg-blue-500 text-2xl text-white rounded-md text-center cursor-pointer select-none'>
                    Send OTP
                </motion.div> 
                :""
              }
            </>
            <h5 className='text-gray-500'>Already have an account? <span onClick={()=>(setLogin(true))} className='text-blue-500 cursor-pointer'>Login</span></h5>
          </motion.div>
          
              
          <motion.div
          initial={{display:signup&&sendOtp?'flex':'none',opacity:signup&&sendOtp?1:0}}
          transition={{duration:0.2,type:'easeInOut'}}
          animate={{display:signup&&sendOtp?'flex':'none',opacity:signup&&sendOtp?1:0}}
          className='w-full h-full flex flex-col shrink-0 gap-2 lg:gap-4  items-center justify-center'>
            <input name='name' onChange={onChange} className='w-11/12 lg:w-3/4 h-12 border-b-2 border-gray-300 bg-transparent drop-shadow-xl shadow-blue-300 outline-none px-3 ring-2 ring-gray-200 focus:ring-blue-400 rounded-lg' placeholder='Full Name'/>
            <input name='password' onChange={onChange} className='w-11/12 lg:w-3/4 h-12 border-b-2 border-gray-300 bg-transparent drop-shadow-xl shadow-blue-300 outline-none px-3 ring-2 ring-gray-200 focus:ring-blue-400 rounded-lg' placeholder='Password'/>
            <input name='businessName' onChange={onChange} className='w-11/12 lg:w-3/4 h-12 border-b-2 border-gray-300 bg-transparent drop-shadow-xl shadow-blue-300 outline-none px-3 ring-2 ring-gray-200 focus:ring-blue-400 rounded-lg' placeholder='Business Name'/>
            <input name='businessType' onChange={onChange} className='w-11/12 lg:w-3/4 h-12 border-b-2 border-gray-300 bg-transparent drop-shadow-xl shadow-blue-300 outline-none px-3 ring-2 ring-gray-200 focus:ring-blue-400 rounded-lg' placeholder='Business Type'/>
            <motion.div
            whileHover={{scale:1.1}}
            whileTap={{scale:0.9}}
            onClick={handleRegister}
            className='w-1/2 h-fit py-2 bg-blue-500 text-2xl text-white rounded-md text-center cursor-pointer select-none'>
              Get Started
            </motion.div>
          </motion.div>
        </div>
        </>
        }
    </div>
  )
}


function Login({setLogin}){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (e) => {
    if(e.target.name === 'email') setEmail(e.target.value);
    else setPassword(e.target.value);
  };
  const handleLogin = async () => {
    const response = await login(email,password);
    console.log(response);
    if(response === 200){
      const response = await getCurrentUser();
      console.log(response);
      if (response.statusCode === 200) {
        console.log(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
        localStorage.setItem("status", true);
        window.location.reload();
      }
    }
  }
  return (
    <>
    <h1 className='text-2xl h-1/4 px-3 flex justify-start items-center text-blue-400'>Welcome Back! Login Here.</h1>
    <div className='w-full h-3/4 flex flex-col items-center justify-center gap-4'>
      <input name='email' onChange={onChange} className='w-3/4 h-12 mb-2 border-b-2 border-gray-300 bg-transparent drop-shadow-xl shadow-blue-300 outline-none px-3 ring-2 ring-gray-200 focus:ring-blue-400 rounded-lg' placeholder='Email'/>
      <input name='password' onChange={onChange} className='w-3/4 h-12 mb-2 border-b-2 border-gray-300 bg-transparent drop-shadow-xl shadow-blue-300 outline-none px-3 ring-2 ring-gray-200 focus:ring-blue-400 rounded-lg' placeholder='Password'/>
      <motion.div
      whileHover={{scale:1.1}}
      whileTap={{scale:0.9}}
      onClick={handleLogin}
      className='w-1/2 h-fit py-3 bg-blue-500 text-2xl text-white rounded-md text-center cursor-pointer select-none'>
        Login
      </motion.div>
      <h5 className='text-gray-500'>Don't have an account? <span onClick={()=>(setLogin(false))} className='text-blue-500 cursor-pointer'>Sign Up</span></h5>
    </div>   
    </>
  )

}

export default Landing