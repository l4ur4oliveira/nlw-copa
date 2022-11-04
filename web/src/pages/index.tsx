import Image from 'next/image'
import appPreviewImg from '../assets/app-preview.png'
import usersExample from '../assets/users-example.png'
import logo from '../assets/logo.svg'
import iconCheck from '../assets/icon-check.svg'

interface HomeProps {
  count: number;
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <main>
        <Image src={logo} alt="NLW Copa" />

        <h1>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div>
          <Image src={usersExample} alt="" />
          <strong>
            <span>+12.592</span> pessoas já estão usando
          </strong>
        </div>

        <form>
          <input type="text" required placeholder='Qual nome do seu bolão?' />
          <button type="submit">Criar meu bolão</button>
        </form>

        <p>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div>
          <div>
            <Image src={iconCheck} alt="" />
            <div>
              <span>+2.034</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div>
            <Image src={iconCheck} alt="" />
            <div>
              <span>+2.034</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação mobile da NLW Copa"
        quality={100}
      />
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()

  console.log(data);
  
  return {
    props : {
      count: data.count,
    }
  }
}
