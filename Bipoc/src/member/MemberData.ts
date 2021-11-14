import AffinityGroup from '../affinity-groups/AffinityGroup.js'

export interface MemberStatusInterface {
  username: string,
  status: string
}

export interface MemberSignupDataInterface {
  username: string,
  email: string,
  password: string,
}

export interface CommonDataInterface {
  username: string,
}

export interface MemberProfileDataInterface extends CommonDataInterface {
  username: string,
  email: string,
  firstname: string,
  lastname: string,
  address: string,
  city: string,
  country: string,
  zipcode: string,
  bio: string,
}

export default interface MemberDataInterface extends MemberProfileDataInterface {
  status: string,
  affinities: AffinityGroup[],
}

export const defaultMemberData: MemberDataInterface = {
  username: "Jane Doe",
  email: "jane@jane.com",
  firstname: "Jane",
  lastname: "Doe",
  address: "555 Five St.",
  city: "Pleasantville",
  country: "USA",
  zipcode: "55555",
  bio: "I'm fake",
  status: "unknown",
  affinities: []
}
