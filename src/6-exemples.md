
# Exemples

## Exemple 1

Programa que calcula la mitjana de dos números enters. S’utilitza una excepció genèrica per controlar tant si s’introdueix un número decimal com si és un alfanumèric.

::: tabs
== Java

```java
package UF09_Exemple01;
import java.util.Scanner;
/**
* UF09 Exemple 01: Programa que calcula la mitjana de dos números enters
*/
public class UF09_Exemple01 {
 
  public static void main(String[] args) {
    Scanner entrada = new Scanner(System.in);

    System.out.println("Càlcul de la mitjana de dos números enters");
    try {
      System.out.print("Introdueix el primer número: ");
      int numero1 = entrada.nextInt();
      System.out.print("Introdueix el segon número: ");
      int numero2 = entrada.nextInt();
      System.out.println("La mitjana és " + (numero1 + numero2) / 2);
    } catch (Exception e) {
      System.out.print("No es pot calcular la mitjana ja que les dades no són correctes.");
    } finally {
      System.out.println("Fi del programa");
    }
  }
} 
```

:::

- Afegeix dos missatges per a mostrar tant el tipus d'excepció com l'error exacte que es produeix fent ús dels mètodes getClass() i getMessage() respectivament sobre l'objecte e. Els missatges es mostraran junts al que ja hi ha quan s’informa de l’excepció.
- Quines modificacions faries al programa per a evitar haver de crear aquesta excepció?

## Exemple 2

Programa que demana el número d'asteriscs que es volen pintar i el número de línies en les que han de quedar repartits. Per tant, es pot produir un error si s’introdueix un número decimal o si s’introdueix 0 en el número de línies.

Farem ús de la funció `Math.ceil()` que arrodoneix a enter per damunt (0,35 → 1.0). A títol informatiu `Math.floor()` fa el mateix però a enter inferior (0,35 → 0.0).

::: tabs
== Java

```java
package UF09_Exemple02;
import java.util.Scanner;
/**
* UF10 Exemple 02: Programa que demana el número d'asteriscs que es volen pintar i
* el número de línies en les que han de quedar repartits.
*/
public class UF09_Exemple02 {
 
  public static void main(String[] args) {
    Scanner entrada = new Scanner(System.in);

    System.out.println("Dibuixar asteriscs");
    try {
      System.out.print("Introdueix el número total d'asteriscs: ");
      int asteriscs = entrada.nextInt();
      System.out.print("Introdueix el número de línies a dibuixar: ");
      int linies = entrada.nextInt();

      int astXLinia = (asteriscs % linies) == 0 ? asteriscs / linies : (int) Math.ceil((double) asteriscs / linies);
      int contaAsteriscs = 0;
      for (int i = 1; i <= linies; i++) {
        System.out.print("Línia " + i + ": ");
        for (int j = 0; (j < astXLinia) && (contaAsteriscs++ < asteriscs); j++) {
          System.out.print("*");
        }
        System.out.println();
      }
    } catch (NumberFormatException nfe) {
      System.out.println("Dades incorrectes, has d'introduir números enters.");
    } catch (ArithmeticException ae) {
      System.out.println("El número de línies no pot ser 0.");
    }
  }
}
```

:::
