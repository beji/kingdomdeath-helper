import { Innovations } from 'interfaces/innovations'
import { IGearGrid } from './gear'
import { UUID } from './generics'
import { ISurvivor } from './survivor'

interface ISettlement {
  readonly id: UUID
  readonly name: string
  readonly survivalLimit: number
  readonly survivors: ReadonlyArray<ISurvivor>
  readonly geargrids: ReadonlyArray<IGearGrid>
  readonly innovations: ReadonlyArray<Innovations>
  readonly year: number
}

export { ISettlement }
