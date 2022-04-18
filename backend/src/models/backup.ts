import mongoose, { Schema } from 'mongoose'

export interface BackupSchema {
  date: Date
  backup: string
}

const backupSchema = new Schema<BackupSchema>({
  date: { type: Date, required: true },
  backup: { type: String, required: true },
})

const Backup = mongoose.model('Backup', backupSchema)

export default Backup
