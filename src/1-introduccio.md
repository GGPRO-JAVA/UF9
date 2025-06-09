# 1. Introducció

**Una excepció és un error semàntic que es produeix en temps d'execució**. Encara que un codi siga correcte sintàcticament (és a dir, complix amb les regles del llenguatge i pot ser traduït o compilat), és possible que durant la seua execució es produïsquen situacions imprevistes, com ara:

- Dividir un nombre per zero.
- Accedir a una posició inexistent dins d’una col·lecció.
- Llegir un valor de tipus incorrecte des d’una entrada de dades.
- Intentar accedir a un recurs extern (com un fitxer) que no existeix o no és accessible.

Quan es produïx un d’estos errors, es pot interrompre el flux normal d'execució del programa. Per evitar-ho, la majoria de llenguatges orientats a objectes disposen de **mecanismes de captura i gestió d’excepcions**. Aquests mecanismes permeten detectar l’error, executar un conjunt d’instruccions de resposta i, si és possible, continuar amb l’execució del programa de forma segura.

Capturar una excepció no significa només evitar que el programa es tanque bruscament, sinó també aplicar alguna lògica per gestionar el problema i restaurar, si cal, un estat vàlid per al programa.

Un mètode es diu capaç de tractar una excepció si inclou una secció de codi que:

- Detecta el tipus d’excepció que pot ocórrer.
- Especifica com recuperar-se o informar de manera controlada (per exemple, mostrant un missatge d’usuari o fent un retorn alternatiu).

En alguns paradigmes, es distingeix entre **errors** de programa (situacions de fallada greu, no recuperables) i **excepcions** (situacions esperables que cal manejar). Però el mecanisme bàsic és sempre el mateix: la propagació de l’excepció per la pila de crides fins a un punt de tractament o fins a la finalització del programa.

:::: tabs
=== Java

En Java, **les excepcions són objectes derivats de la classe Throwable**. Hi ha dues branques principals:

- **Exceptions** per a condicions recuperables.
- **Errors** per a fallades internes del sistema. No estudiarem aquests.

Ambdues classes `Error` i `Exception` són classes derivades de `Throwable`.

Quan en un punt del programa es detecta una condició excepcional, es llança una excepció mitjançant **la instrucció `throw` i es crea un objecte que encapsula**:

- El **tipus d’excepció** (p. ex. ArithmeticException, FileNotFoundException, etc.).
- Un **missatge** descriptiu (opcional) que ajuda a identificar l’origen o la causa de l’error.
- La **traça de pila** (*stack trace*), que registra l’ordre de crides de mètodes fins a aquell punt.

Un mètode es diu que és capaç de tractar una excepció (***Catch Exception***) si ha previst l'error que s'ha produït i les operacions a realitzar per a "recuperar" el programa d'aqueix estat d'error. No és suficient capturar l'excepció: si l'error no es tracta tan sols aconseguirem que el programa no es pare, però l'error pot provocar que les dades o l'execució no siguen correctes.

En el moment en què és llançada una excepció, la màquina virtual Java recorre la pila de cridades a mètodes a la recerca d'algun que siga capaç de tractar la classe d'excepció llançada. Per a això, comença examinant el mètode on s'ha produït l'excepció; si aquest mètode no és capaç de tractar-la, examina el mètode des del qual es va realitzar la cridada al mètode on es va produir l'excepció i així successivament fins a arribar a l'últim d'ells. En cas que cap dels mètodes de la pila siga capaç de tractar l'excepció, la màquina virtual Java mostra un missatge d'error i el programa acaba.

::::

## 1.1. Exemple 1

Com a primera trobada amb les excepcions, executarem el següent programa. En ell forçarem una excepció en intentar dividir un número entre 0:

:::: tabs
=== Java

::: tabs
== Codi

```java
public class Exemple1_excepcions{
    public static void main(String args[]){
        int div, x, y;
        x = 3;
        y = 0;

        div = x / y;

        System.out.println("El resultat és " + div);
    }
}
```

== Eixida

![Eixida exemple 1](/uf9/Eixida_exemple1.jpg)

:::
::::

El que ha ocorregut és que la màquina virtual Java (el programa que executa codi Java) ha detectat una condició d'error, la divisió per 0, i ha creat un objecte de la classe *java.lang.ArithmeticException*. Com el mètode on s'ha produït l'excepció no és capaç de tractar-la, la màquina virtual Java finalitza el programa en la línia on realitza la divisió i mostra un missatge d'error amb la informació sobre l'excepció que s'ha produït.

## 1.2. Exemple 2

A continuació forçarem una excepció de conversió, per a això intentarem passar a enter una cadena que no sols porta caràcters numèrics:

:::: tabs
=== Java

::: tabs
== Codi

```java
public class Exemple2_excepcions{
    public static void main(String args[]){
        String cadena = "56s";
        int num;

        num = Integer.parseInt(cadena);

        System.out.println("El número és " + num);
    }
}
```

== Eixida

![Eixida exemple 2](/uf9/Eixida_exemple2.jpg)

:::
::::

Pel fet que la cadena no té el format adequat ("56s" no representa un número vàlid), el mètode Integer.parseInt(…) no pot convertir-la a un valor de tipus int i llança l'excepció *NumberFormatException*. La màquina virtual Java finalitza el programa en la línia on s'usa el parseInt() i mostra per pantalla la informació sobre l'excepció que s'ha produït.

## 1.3. Exemple 3

En aquest exemple forçarem una excepció de límits del vector, per a això crearem un vector i
intentar accedir a una posició que no existeix:

:::: tabs
=== Java

::: tabs
== Codi

```java
public class Exemple3_excepcions{
    public static void main(String args[]){
        int v[] = {1,2,3};
        int elem;

        elem = v[5];

        System.out.println("L'element és " + elem);
    }
}
```

== Eixida

![Eixida exemple 3](/uf9/Eixida_exemple3.jpg)

:::
::::

En intentar accedir a una posició que sobrepassa la grandària del vector es produeix una excepció de tipus *ArrayIndexOutOfBoundsException*. La màquina virtual de java finalitza el programa en la línia 18 i mostra el missatge d'error sobre l'excepció que s'ha produït.
