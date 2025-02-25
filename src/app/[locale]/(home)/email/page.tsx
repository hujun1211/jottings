import { sendEmail } from '@/actions/email'

export default function Page() {
  return (
    <div>
      <button type="button" onClick={sendEmail}>send email</button>
    </div>
  )
}
