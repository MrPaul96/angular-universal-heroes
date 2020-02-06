import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { Hero } from '../../model/hero.model';
import { ActivatedRoute } from '@angular/router';
import * as actions from '../../store/actions';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getHeroes, getHeroById } from '../../store/selectors/hero.selector';
@Component({
  selector: 'heroe-edit',
  templateUrl: 'hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})

export class HeroEditComponent implements OnInit {
  heroes: Hero[] = null;
  heroToEdit: Hero;
  idToSearch: number;
  heroForm: FormGroup;
  succesfullyUpdate: boolean = false;

  constructor(private store: Store<AppState>,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.setHeroFormValidator();
    this.idToSearch = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.store.pipe(select(getHeroes())).subscribe(heroes => {
      this.heroes = heroes;
      if (!heroes) { this.store.dispatch(new actions.LoadHeroes()); }
    });
    this.store.pipe(select(getHeroById(this.idToSearch))).subscribe(hero => {
      if (hero) { this.heroToEdit = hero; }
      if (this.heroToEdit) { this.setFormValues(); }
    });
  }

  setHeroFormValidator() {
    this.heroForm = new FormGroup({
      nickname: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required)
    });
  }

  setFormValues() {
    this.heroForm.controls.nickname.setValue(this.heroToEdit._nickname);
    this.heroForm.controls.name.setValue(this.heroToEdit._name);
    this.heroForm.controls.height.setValue(this.heroToEdit._height);
  }

  goToPreviousPage() {
    this.router.navigate(['/heroes']);
  }

  updateHero() {
    this.succesfullyUpdate = false;
    if (this.heroForm.valid) {
      this.heroToEdit._nickname = this.heroForm.controls.nickname.value;
      this.heroToEdit._height = this.heroForm.controls.height.value;
      this.heroToEdit._name = this.heroForm.controls.name.value;
      this.succesfullyUpdate = true;
      this.store.dispatch(new actions.UpdateHeroes(this.heroToEdit));
    }
  }
}
