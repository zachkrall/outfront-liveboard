export function resizeCanvas( camera, renderer, width, height ){

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);

}
