import { signInWithGithub } from '@/actions/auth'
import { toast } from '@/shadcn/hooks/use-toast'
import { Button } from '@/shadcn/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/ui/dialog'
import { Separator } from '@/shadcn/ui/separator'
import { Github } from 'lucide-react'
import { LoginForm } from './login-form'

export function LoginModal({ children }: { children: React.ReactNode }) {
  async function LoginWithGithub() {
    const result = await signInWithGithub()
    if (result?.error) {
      toast({
        title: 'Login failed',
        description: result.error,
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogOverlay className="backdrop-blur-sm" />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button variant="outline" onClick={LoginWithGithub}>
            <Github />
            <span>Login with GitHub</span>
          </Button>
          <Button variant="outline">
            <span>Login with Google</span>
          </Button>
          <Separator className="my-2" />
          <LoginForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
