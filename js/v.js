var app;

function loadVue() {
	app = new Vue({
	    el: "#app",
	    data: {
			player,
			tmp,
			format,
			formatWhole,
			formatWhether,
			formatTime,
			tab,
			allTabs,
			tabUnlocks,
			checkFunc,
			Decimal,
			ENEMY_DATA,
			toggleTrophy,
			buyTrophyGenUpg,
			getTrophyGenUpgCost,
        }
	})

	app.player = player;
}