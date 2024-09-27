import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExpensesService {
  private expenses = [
    { id: 1, description: 'Expense 1', amount: 100, userId: 1 },
    { id: 2, description: 'Expense 2', amount: 200, userId: 2 },
  ];

  constructor(private readonly usersService: UsersService) {}

  create(userId: number, createExpenseDto: CreateExpenseDto) {
    const user = this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const lastId = this.expenses[this.expenses.length - 1]?.id || 0;

    const expense = {
      id: lastId + 1,
      ...createExpenseDto,
      userId: user.id,
    };

    this.expenses.push(expense);

    return expense;
  }

  findAll() {
    return this.expenses;
  }

  findOne(id: number) {
    const expense = this.expenses.find((exp) => exp.id === id);
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expenseIndex = this.expenses.findIndex((exp) => exp.id === id);
    if (expenseIndex === -1) {
      throw new NotFoundException('Expense not found');
    }

    const updatedExpense = {
      ...this.expenses[expenseIndex],
      ...updateExpenseDto,
    };

    this.expenses[expenseIndex] = updatedExpense;
    return updatedExpense;
  }

  remove(id: number) {
    const expenseIndex = this.expenses.findIndex((exp) => exp.id === id);
    if (expenseIndex === -1) {
      throw new NotFoundException('Expense not found');
    }

    const removedExpense = this.expenses.splice(expenseIndex, 1);
    return removedExpense[0];
  }
}
