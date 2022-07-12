export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    withCredentials: true,
    progress: false,
  })

  // Inject to context as $api
  inject('api_not_loader', api)
}
