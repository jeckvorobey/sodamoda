export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    withCredentials: true,
    progress: true,
  })

  // Inject to context as $api
  inject('api_loader', api)
}
