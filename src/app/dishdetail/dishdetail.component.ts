import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackTwo } from '../shared/feedbacktwo';
import { comment } from '../shared/comment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  
})
export class DishdetailComponent implements OnInit {
    dish: Dish;
    dishcopy = null;
    dishIds: {} | number[];
    prev: number;
    next: number;
    feedbackForm: FormGroup;
    feedback: FeedbackTwo;
    form: Form;
    formErrors = {
      'name': '',
      'comment': ''
    };
    validationMessages = {
      'name': {
        'required': 'Name is Required',
        'minlength': 'Name must be atleast 2 characters long',
        'maxlength': 'Name cannot be more than 25 characters long'
      },
      'comment': {
        'required': 'Comment is Required',
        'minlength': 'Comment must be atleast 2 characters long',
        'maxlength': 'Comment cannot be more than 25 characters long'
      }
    }
    errMess: string;
    defaultRating: number = 5;

    constructor(private dishservice: DishService,
                private route: ActivatedRoute,
                private location: Location,
                private fb: FormBuilder,
                @Inject('BaseURL') private BaseURL) {
      this.createForm();
      this.onValueChanged();
    }          
    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.
        switchMap((params: Params) => this.dishservice.getDish(+params['id'])).
        subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); });
      console.log(this.route.params);
    }   
    setPrevNext(dishId: number) {
      if(Array.isArray(this.dishIds)){
        let index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
      }
    }
    goBack(): void {
      this.location.back();
    }
    createForm() {
      console.log("create form");
      this.feedbackForm = this.fb.group({
        name: ['',[ Validators.required, Validators.minLength(2), Validators.maxLength(25) ]],
        rating: this.defaultRating,
        comment: ['',[ Validators.required, Validators.minLength(2), Validators.maxLength(25) ]]
      });
      this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
      console.log("feedbackForm" + this.feedbackForm);
    }
    onSubmit() {
      const currentDate = new Date();
      const comment: comment = { rating : this.feedbackForm.get('rating').value,
                        comment : this.feedbackForm.get('comment').value,
                        author: this.feedbackForm.get('name').value,
                        date: currentDate.toISOString()};
      this.dishcopy.comments.push(comment);
      this.dishcopy.save().subscribe(dish => this.dish = dish);
      console.log(comment);
      this.feedbackForm.reset({
        name: '',
        rating: this.defaultRating,
        comment: ''
      });
    }
   onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}
