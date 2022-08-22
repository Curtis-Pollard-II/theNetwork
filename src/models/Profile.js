export class Profile {
    constructor(data) {
      this.id = data.id
      this.name = data.name
      this.picture = data.picture
      this.coverImg = data.coverImg 
      this.linkedin = data.linkedin || '🔗'
      this.graduated = data.graduated || '🎓'
      this.github = data.github || '💻'
      this.class = data.class
      this.bio = data.bio
    }
  }