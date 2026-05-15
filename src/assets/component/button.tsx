import type { JSX } from "react"
import { useState } from "react"

type Props = {
    count?: number
    increment?: () => void
    decrement?: () => void
    erase?: () => void
}

function MyButton(): JSX.Element {
    const [rsvp, setRsvp] = useState<{
        attending?: boolean
        meal?: string
        music?: string
    } | null>(null)

        const [formOpen, setFormOpen] = useState(false)
        const [formAttending, setFormAttending] = useState<boolean>(true)
        const [formMeal, setFormMeal] = useState<string>("Chicken")
        const [formMusic, setFormMusic] = useState<string>("DJ")

        function openForm() {
            if (rsvp) {
                setFormAttending(Boolean(rsvp.attending))
                setFormMeal(rsvp.meal || "Chicken")
                setFormMusic(rsvp.music || "DJ")
            }
            setFormOpen(true)
        }

        function submitForm(e: React.FormEvent) {
            e.preventDefault()
            if (!formAttending) {
                setRsvp({ attending: false })
            } else {
                setRsvp({ attending: true, meal: formMeal, music: formMusic })
            }
            setFormOpen(false)
        }

        function cancelForm() {
            setFormOpen(false)
        }

   

    return (
        <div>
            <button onClick={openForm}>RSVP / Choose Meal & Music</button>

            {rsvp && (
                <div>
                    {rsvp.attending ? (
                        <div>
                            <strong>Thanks for RSVPing!</strong>
                            <div>Meal: {rsvp.meal}</div>
                            <div>Music: {rsvp.music}</div>
                        </div>
                    ) : (
                        <div>
                            <strong>Sorry you can't make it.</strong>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default MyButton
