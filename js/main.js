// Main Game Entry Point

document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI
    UI.init();

    // Check for existing save
    if (loadState()) {
        // Continue from save
        UI.hideIntroScreen();
        UI.updateAll();

        // Resume scene if player was mid-interaction, otherwise default to workshop
        if (gameState.currentSceneId && SCENES[gameState.currentSceneId]) {
            SceneManager.resumeScene(gameState.currentSceneId);
        } else {
            UI.showWorkshopIntro();
        }
    } else {
        // Show intro screen for new game
        UI.showIntroScreen();
    }
});
